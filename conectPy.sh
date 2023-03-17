if [ ! -d "utils" ];then
    echo "file exists and start to python venv ☕️☕️☕️☕️....."
    # read confi file

else 
    echo "utils  directory  not exist  will create it in local ☕️☕️☕️☕️ ..."
    echo "start create file ..."
    mkdir -p utils
    echo "Press the file name for your create ..."
    read file_name
    cd utils && mkdir -p $file_name
    echo $file_name " created successfully"
    echo "Press the virtualenv name for your venc ..."
    read venv_name
    python3 -m pip install virtualenv
    python -m virtualenv $venv_name
    cd $venv_name && soucre bin/activate 

fi

