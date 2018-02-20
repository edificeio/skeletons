# Skeletons : generate ODE application's boilerplate

This project aims at ease the bootstrap of ODE application's skeleton. 

NOTE: Browse https://opendigitaleducation.gitbooks.io/reference-manual/ to browse Open Digital Education Framework capabilites

## How to use

- install Gradle 1.6+

- Edit `template-engine-properties` file to suit your needs
- Launch the command : ``gradle buildSkeleton``

You will be guided through the skeleton generation which will prompt you several times for data.

## File details

* **template-engine.properties**

    This Java Properties file contains a list of key/value pairs which are used during the creation of a template.
    These substitutions can occur inside file contents as well as in file or directory names.

    Below are some important key/values and their description :

    * **APPNAME** : The name of your application.
    * **ORGANISATION**:
        The name of your organisation.<br>
        *Must respect the java package naming convention ! (ex: fr.wseduc)*
    * **PORT**:
        The application port registered in ent-core.<br>
        *Ensure that the port is not already used by another application.*
    * **ENTCORE_VERSION**:
        The version of ent-core used by your application.

    *The following fields whill be used when publishing the module to a repo.*
    * DEV_ID: Your developer id.
    * DEV_NAME: Your name.
    * DEV_MAIL: Your e-mail.


* **template-engine-ignore**

    This file located inside the root of any template directory contains a list of files & repositories to ignore during the processing.
    The format is simple, one line = one file / directory name.

    *Please note that REGEX format is not currently supported*

    There are two ways you can ignore a file :
    -   **Copy** the file or folder (including its contents) without parsing (which means no substitutions)<br>
    -   **Ignore completely** the file or folder.<br>
        In this case, precede the file name with a ``>``.<br>
        For instance, the line ``>.DS_STORE`` makes the parser completely ignore files named *.DS_STORE*

## File tree

```
.
├── build.gradle
|    ~> Gradle build file
├── Readme.me
|    ~> This readme file.
├── template-engine.properties
|    ~> Configuration file with pairs of value / keys
|       used during the templating process.
└── templates
        ├── template_folder1
        ├── template_folder2
        |  
        |   ~> N template folders, each one containing
        |      a different template model.
        |
        └── template_folderN
                  ├── template-engine-ignore
                  |     ~> Files to ignore during the templating process.
                  └── (TEMPLATE FILES & FOLDERS)

```

## Templates provided

* **blank_app**

    This template creates a blank application (ie: only the basic structure and empty files) to the location of your choice.

* **mongodb_resource_app**

    This template creates an application to the location of your choice using a backend REST API with MongoDB bindings and a front-end interface allowing resource creation, deletion and sharing.

    Once the application is generated you will have to register it inside an existing ent-core instance by copying the mod.json contents to the vert.x configuration file, then install it to your local repository by typing ``gradle install``.
