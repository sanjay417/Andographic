import torch
import torch.nn as nn

"""ensure you have opcode files pre processed from data to be feed into rnn lstm and gru model"""


class RNNMalware_Model1(torch.nn.Module):
    def __init__(self, input_dim=0, embedding_dim=100, hidden_dim=100, output_dim=20,
                 batch_size=256, num_layers=1, bidirectional=False, dropout=0):
        super().__init__()
        self.input_dim = input_dim
        self.embedding_dim = embedding_dim
        self.hidden_dim = hidden_dim
        self.output_dim = output_dim
        self.batch_size = batch_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.dropout = dropout
        self.fc_hidden_dim = self.hidden_dim

        if self.bidirectional:
            self.fc_hidden_dim = self.hidden_dim * 2

        self.embedding = nn.Embedding(self.input_dim, self.embedding_dim)
        self.rnn = nn.RNN(input_size=self.embedding_dim, hidden_size=self.hidden_dim, num_layers=self.num_layers,
                          nonlinearity='relu', bidirectional=self.bidirectional, dropout=self.dropout)
        self.fc = nn.Linear(self.fc_hidden_dim, self.output_dim)

    def forward(self, opcode):
        embedded = self.embedding(opcode)
        output, hidden = self.rnn(embedded)
        return self.fc(output[-1])


class LSTMMalware_Model1(torch.nn.Module):
    def __init__(self, input_dim=0, embedding_dim=100, hidden_dim=100, output_dim=20,
                 batch_size=256, num_layers=1, bidirectional=False, dropout=0):
        super().__init__()
        self.input_dim = input_dim
        self.embedding_dim = embedding_dim
        self.hidden_dim = hidden_dim
        self.output_dim = output_dim
        self.batch_size = batch_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.dropout = dropout
        self.fc_hidden_dim = self.hidden_dim

        if self.bidirectional:
            self.fc_hidden_dim = self.hidden_dim * 2

        self.embedding = nn.Embedding(self.input_dim, self.embedding_dim)

        self.lstm = nn.LSTM(input_size=self.embedding_dim, hidden_size=self.hidden_dim, num_layers=self.num_layers,
                            bidirectional=self.bidirectional, dropout=self.dropout)

        self.dropout_layer = nn.Dropout(self.dropout)

        self.fc = nn.Linear(self.fc_hidden_dim, self.output_dim)

    def forward(self, opcode):
        embedded = self.embedding(opcode)
        output, (hidden, cell) = self.lstm(embedded)

        if self.bidirectional:
            hidden = torch.cat((hidden[-2, :, :], hidden[-1, :, :]), dim=1)
        else:
            hidden = hidden[-1::].squeeze(0)

        fc_in = self.dropout_layer(hidden)
        return self.fc(fc_in)


class GRUMalware_Model1(torch.nn.Module):
    def __init__(self, input_dim=0, embedding_dim=100, hidden_dim=100, output_dim=20,
                 batch_size=256, num_layers=1, bidirectional=False, dropout=0):
        super().__init__()
        self.input_dim = input_dim
        self.embedding_dim = embedding_dim
        self.hidden_dim = hidden_dim
        self.output_dim = output_dim
        self.batch_size = batch_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.dropout = dropout
        self.fc_hidden_dim = self.hidden_dim

        if self.bidirectional:
            self.fc_hidden_dim = self.hidden_dim * 2

        self.embedding = nn.Embedding(self.input_dim, self.embedding_dim)

        self.gru = nn.GRU(input_size=self.embedding_dim, hidden_size=self.hidden_dim, num_layers=self.num_layers,
                          bidirectional=self.bidirectional, dropout=self.dropout)

        self.dropout_layer = nn.Dropout(self.dropout)

        self.fc = nn.Linear(self.fc_hidden_dim, self.output_dim)

    def forward(self, opcode):
        embedded = self.embedding(opcode)
        output, hidden = self.gru(embedded)

        if self.bidirectional:
            hidden = torch.cat((hidden[-2, :, :], hidden[-1, :, :]), dim=1)
        else:
            hidden = hidden[-1::].squeeze(0)

        fc_in = self.dropout_layer(hidden)
        return self.fc(fc_in)
