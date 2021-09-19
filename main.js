import "./style.css";
import sandbox from "./sandbox";
import tests from "./tests";
import { createEditor } from "./editor";

const challenge = document.querySelector("#challenge");

const editor = createEditor();
appendTests();
document.querySelector("#run").addEventListener("click", runCode);

async function runCode() {
    document.querySelector("#error").innerHTML = "";
    document.querySelector("#tasks").innerHTML = "";
    const code = editor.getValue();
    const result = await sandbox(code, {
        test: tests.find((test) => test.name === challenge.value).test,
    });
    console.log(result);
    if (result.error) {
        document.querySelector("#error").innerHTML = result.error;
    } else {
        showResult(result.tasks);
    }
}

function appendTests() {
    tests.forEach((test) => {
        const option = document.createElement("option");
        option.innerHTML = test.name;
        option.value = test.name;
        option.dataset.description = test.description;
        challenge.appendChild(option);
    });
    challenge.addEventListener("change", changeDescription);
    changeDescription();

    function changeDescription() {
        document.querySelector("#error").innerHTML = "";
        document.querySelector("#tasks").innerHTML = "";
        document.querySelector("#description").innerHTML = challenge.options[
            challenge.selectedIndex
        ].dataset.description.replace(/\n/g, "<br>");
    }
}

function showResult(tasks) {
    let passed = tasks.filter((x) => x.passed).length;
    let elm = document.createElement("div");
    elm.classList.add("task", "summary");
    if (passed === tasks.length) elm.classList.add("passed");
    else if (passed > 0) elm.classList.add("part-passed");
    elm.innerHTML = `<span class="task-name">通過項目: ${passed} / ${tasks.length}</span>`;
    document.querySelector("#tasks").appendChild(elm);
    for (const task of tasks) {
        let elm = document.createElement("div");
        elm.classList.add("task");
        if (task.passed) elm.classList.add("passed");
        elm.innerHTML = `<span class="task-name">${task.name}</span>`;
        document.querySelector("#tasks").appendChild(elm);
    }
}
