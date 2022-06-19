# Andrographic

The goal of this tool is to assist other researchers in analyzing various security elements of Android applications by creating custom charts, reviewing in-built summary charts, and identifying trends by obtaining knowledge from the correlation between various metrics the application's harmful nature. In addition to this, we added static and dynamic analyses of applications to take it to the next level and provide users with all the information necessary to determine whether an application belongs to the benign class or the malicious class by using a penetration testing framework known as “MOBSF”.   

There are three main servers to run - Mobsf, Node, Flask(Python). Described below are all the prerequisites and steps to run the same

    MobSF

    Requirements
    Static Analysis
        Mac
            Install Git
            Install Python 3.8-3.9
            After installing Python 3.8+, go to /Applications/Python 3.8/ and run Update Shell Profile.command first and then Install Certificates.command
            Install JDK 8+
            Install command line tools xcode-select --install
            Download & Install wkhtmltopdf as per the wiki instructions
            Windows App Static analysis requires a Windows Host or Windows VM for Mac and Linux. More Info

        Ubuntu/Debian based Linux:
            Install Git sudo apt-get install git
            Install Python 3.8-3.9 sudo apt-get install python3.8
            Install JDK 8+ sudo apt-get install openjdk-8-jdk
            Install the following dependencies
            sudo apt install python3-dev python3-venv python3-pip build-essential libffi-dev libssl-dev libxml2-dev libxslt1-dev libjpeg8-dev zlib1g-dev wkhtmltopdf

        Windows
            Install Git
            Install Python 3.8-3.9
            Install JDK 8+
            Install Microsoft Visual C++ Build Tools
            Install OpenSSL (non-light)
            Download & Install wkhtmltopdf as per the wiki instructions
            Add the folder that contains wkhtmltopdf binary to environment variable PATH.
            IMPORTANT: Set JAVA_HOME environment variable. iOS IPA Analysis works only on Mac, Linux and Docker containers.

    Dynamic Analysis
        Dynamic Analysis will not work if you use MobSF docker container or setup MobSF inside a Virtual Machine.
        Install Genymotion or Genymotion Cloud VM or Android Studio Emulator
        (Prerequisite to run andorid emulators)Link to virtualbox - https://www.virtualbox.org/wiki/Downloads
        Link to Genymotion Android Emulator - https://www.genymotion.com/download/

        IMPORTANT: Run this before runnning MobSF to automatically detect the android instance in MobSF server. 

    Installation and Running
        Open up a terminal
        Linux/Mac
            git clone https://github.com/MobSF/Mobile-Security-Framework-MobSF.git
            cd Mobile-Security-Framework-MobSF
            ./setup.sh
            ./run.sh 127.0.0.1:8000

        Windows
            git clone https://github.com/MobSF/Mobile-Security-Framework-MobSF.git
            cd Mobile-Security-Framework-MobSF
            setup.bat
            run.bat 127.0.0.1:8000



    Node JS
    
    Requirements
        Link to Nodejs - https://nodejs.org/en/download/

    Installation and Running
        Open up "IndependentStudy-master" folder in VSCODE and open two terminals.
        For the First terminal, head to frontend folder and run "npm install", which should install all the required packages from package-lock.json
        Then, run "npm start" which should startup the frontend on port 3000. Visit "http://localhost:3000" and website should load up.

        For the decond terminal, head to backend folder and run "npm install", which should install all the required packages from package-lock.json
        Then, run "node app.js" which should start backend for the same.

    


    Python

    Requirements
        Install latest python from here - https://www.python.org/downloads/
        Install flask by running this command on terminal - "pip install flask"

    Installation and Running
        Head to the "AndrographicML-main" folder and run the "analyzer.py" file, which handles all the api calls for static and dynamic analysis.