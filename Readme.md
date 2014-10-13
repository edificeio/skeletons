Ent-core gradle archetypes
==========================

This project aims to ease the task of programmers by providing several ent-core archetypes
along with an easy-to-use gradle build system.

For more information on ent-core, please visit the GitHub repository at the following address :
https://github.com/entcore/entcore


## Usage

#### Dependencies :

- Gradle 1.6

#### How to :

- Open in an editor the file template-engine-properties and modify the contents to suit your needs
- Launch the gradle task by typing in a terminal :
        gradle buildArchetype

You will be guided through the archetype generation which will prompt you several times for data.

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

#### File details

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
        In this case, precede the file name with a ``>`` :<br>
        ``>.DS_STORE``
