# Tasks Manager App

_This is an App to simulate to run some tasks in a cloud-like environment_

<img src="https://github.com/ingdanielsanchezve/fligths/assets/42616141/ed10ef4a-7514-483c-9991-731bb39d006b" width="1080">

### Instalation 🔧

_Clone this repo_

_Install dependencies using `yarn`_

```
yarn
```

## Getting Started ⚙️

Execute next command to start the app, then go to the url shown in the terminal console. (usually `http://localhost:8080/`)
```
yarn serve
```

## Workflow

Once the App is running on your server you must see the next screen

<img src="https://github.com/ingdanielsanchezve/fligths/assets/42616141/1c3bc314-e8f3-461e-b656-2933c7d445d4" width="1080">

* Select a Compute VM option to run the task
* Enter a Valid Task Name (Only alpha chars and spaces allowed)
* Click the Run Button (▶️) to execute the Task
* Once the task is being Running you can see the Log output about the task status, the completition percentage
* When a task is in execution the app, will show the Cancel button (❌) to stop the task execution

### `Tasks history`

This component renders the tasks history and the metadata about each task execution, Name, Status, Vm Type, Execution Time in Ms (Or Elapsed Time until Cancelation) and Date and Time of the Task Execution

<img src="https://github.com/ingdanielsanchezve/fligths/assets/42616141/41fb11a0-027d-43a4-872e-f436eba0418e" width="1080">

* Each Column in this history allows the user to sort the displayed data based on each property in descendent or ascendet order

## Built with Love ❤️ with

* [Vue 2.6.14](https://vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Fontawesome Icons](https://fontawesome.com/)

## Credits
- Developed by: Daniel Sánchez

## License
The MIT License (MIT)