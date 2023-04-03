import torch
# from data_utils.data_loaders import *
from torch import device
from tqdm import tqdm

"training for all models follows the same structure below, ive done you one for RNN make sure you assign your device either to cpu or GPU"


def train_rnn_model(model=None, model_params=None, criterion=None,
                    train_loader=None, log_dir=None):
    epochs = model_params['epochs']
    lr = model_params['lr']

    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

    train_losses = []
    train_accuracy = []

    tqdm_train_descr_format = "Training RNN model: Epoch Accuracy = {:02.4f}%, Loss = {:.8f}"
    tqdm_train_descr = tqdm_train_descr_format.format(0, float('inf'))
    tqdm_train_obj = tqdm(range(epochs), desc=tqdm_train_descr)

    model.train(True)

    for i in tqdm_train_obj:

        epoch_corr = 0
        epoch_loss = 0
        total_samples = 0
        for b, batch in enumerate(train_loader):
            batch.text = batch.text.to(device)
            batch.label = batch.label.to(device)

            predictions = model(batch.text)
            loss = criterion(predictions, batch.label)

            predicted = torch.max(predictions.data, 1)[1]
            batch_corr = (predicted == batch.label).sum()
            epoch_corr += batch_corr.item()
            epoch_loss += loss.item()
            total_samples += predictions.shape[0]

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        epoch_accuracy = epoch_corr * 100 / total_samples
        epoch_loss = epoch_loss / total_samples

        train_losses.append(epoch_loss)
        train_accuracy.append(epoch_accuracy)

        tqdm_descr = tqdm_train_descr_format.format(epoch_accuracy, epoch_loss)
        tqdm_train_obj.set_description(tqdm_descr)

    return model, train_losses, train_accuracy


def test_rnn_model(model=None, model_params=None, criterion=None,
                   val_loader=None):
    tqdm_test_descr_format = "Testing RNN model: Batch Accuracy = {:02.4f}%"
    tqdm_test_descr = tqdm_test_descr_format.format(0)
    tqdm_test_obj = tqdm(val_loader, desc=tqdm_test_descr)
    num_of_batches = len(val_loader)

    model.eval()

    total_test_loss = 0
    total_test_acc = 0
    predicted_all = torch.tensor([], dtype=torch.long, device=device)
    ground_truth_all = torch.tensor([], dtype=torch.long, device=device)

    with torch.no_grad():
        for b, batch in enumerate(tqdm_test_obj):

            batch.text = batch.text.to(device)
            batch.label = batch.label.to(device)

            predictions = model(batch.text)
            loss = criterion(predictions, batch.label)

            predicted = torch.max(predictions.data, 1)[1]
            batch_corr = (predicted == batch.label).sum()
            batch_acc = batch_corr.item() * 100 / predictions.shape[0]
            total_test_acc += batch_acc
            total_test_loss += loss.item()

            predicted_all = torch.cat((predicted_all, predicted), 0)
            ground_truth_all = torch.cat((ground_truth_all, batch.label), 0)

            tqdm_test_descr = tqdm_test_descr_format.format(batch_acc)
            tqdm_test_obj.set_description(tqdm_test_descr)

    predicted_all = predicted_all.cpu().numpy()
    ground_truth_all = ground_truth_all.cpu().numpy()
    total_test_acc = total_test_acc / num_of_batches

    return total_test_acc, predicted_all, ground_truth_all