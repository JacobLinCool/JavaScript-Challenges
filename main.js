import "./style.css";
import * as monaco from "monaco-editor";
import sandbox from "./sandbox";
import tests from "./tests";

const challenge = document.querySelector("#challenge");

const editor = setupEditor();
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

function setupEditor() {
    monaco.editor.defineTheme("nord", {
        base: "vs",
        inherit: false,
        semanticHighlighting: true,
        rules: [
            { background: "#2e3440ff", foreground: "#d8dee9ff" },
            { token: "emphasis", fontStyle: "italic" },
            { token: "strong", fontStyle: "bold" },
            { token: "comment", foreground: "#616E88" },
            { token: "constant.character", foreground: "#EBCB8B" },
            { token: "constant.character.escape", foreground: "#EBCB8B" },
            { token: "constant.language", foreground: "#81A1C1" },
            { token: "constant.numeric", foreground: "#B48EAD" },
            { token: "constant.regexp", foreground: "#EBCB8B" },
            { token: "number", foreground: "#B48EAD" },
            {
                token: ["entity.name.class", "entity.name.type.class"],
                foreground: "#8FBCBB",
            },
            { token: "entity.name.function", foreground: "#88C0D0" },
            { token: "entity.name.tag", foreground: "#81A1C1" },
            { token: "entity.other.attribute-name", foreground: "#8FBCBB" },
            {
                token: "entity.other.inherited-class",
                foreground: "#8FBCBB",
                fontStyle: "bold",
            },
            {
                token: "invalid.deprecated",
                background: "#EBCB8B",
                foreground: "#D8DEE9",
            },
            {
                token: "invalid.illegal",
                background: "#BF616A",
                foreground: "#D8DEE9",
            },
            { token: "keyword", foreground: "#81A1C1" },
            { token: "keyword.operator", foreground: "#81A1C1" },
            { token: "keyword.other.new", foreground: "#81A1C1" },
            { token: "markup.bold", fontStyle: "bold" },
            { token: "markup.changed", foreground: "#EBCB8B" },
            { token: "markup.deleted", foreground: "#BF616A" },
            { token: "markup.inserted", foreground: "#A3BE8C" },
            { token: "meta.preprocessor", foreground: "#5E81AC" },
            { token: "punctuation", foreground: "#ECEFF4" },
            {
                token: [
                    "punctuation.definition.method-parameters",
                    "punctuation.definition.function-parameters",
                    "punctuation.definition.parameters",
                ],
                foreground: "#ECEFF4",
            },
            { token: "punctuation.definition.tag", foreground: "#81A1C1" },
            {
                token: [
                    "punctuation.definition.comment",
                    "punctuation.end.definition.comment",
                    "punctuation.start.definition.comment",
                ],
                foreground: "#616E88",
            },
            { token: "punctuation.section", foreground: "#ECEFF4" },
            {
                token: [
                    "punctuation.section.embedded.begin",
                    "punctuation.section.embedded.end",
                ],
                foreground: "#81A1C1",
            },
            { token: "punctuation.terminator", foreground: "#81A1C1" },
            { token: "punctuation.definition.variable", foreground: "#81A1C1" },
            { token: "storage", foreground: "#81A1C1" },
            { token: "string", foreground: "#A3BE8C" },
            { token: "string.regexp", foreground: "#EBCB8B" },
            { token: "support.class", foreground: "#8FBCBB" },
            { token: "support.constant", foreground: "#81A1C1" },
            { token: "support.function", foreground: "#88C0D0" },
            { token: "support.function.construct", foreground: "#81A1C1" },
            { token: "support.type", foreground: "#8FBCBB" },
            { token: "support.type.exception", foreground: "#8FBCBB" },
            { token: "token.debug-token", foreground: "#b48ead" },
            { token: "token.error-token", foreground: "#bf616a" },
            { token: "token.info-token", foreground: "#88c0d0" },
            { token: "token.warn-token", foreground: "#ebcb8b" },
            { token: "variable.other", foreground: "#D8DEE9" },
            { token: "variable.language", foreground: "#81A1C1" },
            { token: "variable.parameter", foreground: "#D8DEE9" },
            {
                token: [
                    "source.js punctuation.decorator",
                    "source.js meta.decorator variable.other.readwrite",
                    "source.js meta.decorator entity.name.function",
                ],
                foreground: "#D08770",
            },
            {
                token: "source.js meta.object-literal.key",
                foreground: "#88C0D0",
            },
            {
                token: "source.js storage.type.class.jsdoc",
                foreground: "#8FBCBB",
            },
            {
                token: [
                    "source.js string.quoted.template punctuation.quasi.element.begin",
                    "source.js string.quoted.template punctuation.quasi.element.end",
                    "source.js string.template punctuation.definition.template-expression",
                ],
                foreground: "#81A1C1",
            },
            {
                token: "source.js string.quoted.template meta.method-call.with-arguments",
                foreground: "#ECEFF4",
            },
            {
                token: [
                    "source.js string.template meta.template.expression support.variable.property",
                    "source.js string.template meta.template.expression variable.other.object",
                ],
                foreground: "#D8DEE9",
            },
            {
                token: "source.js support.type.primitive",
                foreground: "#81A1C1",
            },
            { token: "source.js variable.other.object", foreground: "#D8DEE9" },
            {
                token: "source.js variable.other.readwrite.alias",
                foreground: "#8FBCBB",
            },
            {
                token: [
                    "source.js meta.embedded.line meta.brace.square",
                    "source.js meta.embedded.line meta.brace.round",
                    "source.js string.quoted.template meta.brace.square",
                    "source.js string.quoted.template meta.brace.round",
                ],
                foreground: "#ECEFF4",
            },
        ],
        colors: {
            focusBorder: "#3b4252",
            foreground: "#d8dee9",
            "activityBar.background": "#2e3440",
            "activityBar.dropBackground": "#3b4252",
            "activityBar.foreground": "#d8dee9",
            "activityBar.activeBorder": "#88c0d0",
            "activityBar.activeBackground": "#3b4252",
            "activityBarBadge.background": "#88c0d0",
            "activityBarBadge.foreground": "#2e3440",
            "editorActiveLineNumber.foreground": "#d8dee9cc",
            "editorCursor.foreground": "#d8dee9",
            "editorHint.border": "#ebcb8b00",
            "editorHint.foreground": "#ebcb8b",
            "editorIndentGuide.background": "#434c5eb3",
            "editorIndentGuide.activeBackground": "#4c566a",
            "editorLineNumber.foreground": "#4c566a",
            "editorLineNumber.activeForeground": "#d8dee9",
            "editorWhitespace.foreground": "#4c566ab3",
            "editorWidget.background": "#2e3440",
            "editorWidget.border": "#3b4252",
            "editor.background": "#2e3440",
            "editor.foreground": "#d8dee9",
            "editor.hoverHighlightBackground": "#3b4252",
            "editor.findMatchBackground": "#88c0d066",
            "editor.findMatchHighlightBackground": "#88c0d033",
            "editor.findRangeHighlightBackground": "#88c0d033",
            "editor.lineHighlightBackground": "#3b4252",
            "editor.lineHighlightBorder": "#3b4252",
            "editor.inactiveSelectionBackground": "#434c5ecc",
            "editor.inlineValuesBackground": "#4c566a",
            "editor.inlineValuesForeground": "#eceff4",
            "editor.selectionBackground": "#434c5ecc",
            "editor.selectionHighlightBackground": "#434c5ecc",
            "editor.rangeHighlightBackground": "#434c5e52",
            "editor.wordHighlightBackground": "#81a1c166",
            "editor.wordHighlightStrongBackground": "#81a1c199",
            "editor.stackFrameHighlightBackground": "#5e81ac",
            "editor.focusedStackFrameHighlightBackground": "#5e81ac",
            "editorError.foreground": "#bf616a",
            "editorError.border": "#bf616a00",
            "editorWarning.foreground": "#ebcb8b",
            "editorWarning.border": "#ebcb8b00",
            "editorBracketMatch.background": "#2e344000",
            "editorBracketMatch.border": "#88c0d0",
            "editorCodeLens.foreground": "#4c566a",
            "editorGroup.background": "#2e3440",
            "editorGroup.border": "#3b425201",
            "editorGroup.dropBackground": "#3b425299",
            "editorGroupHeader.border": "#3b425200",
            "editorGroupHeader.noTabsBackground": "#2e3440",
            "editorGroupHeader.tabsBackground": "#2e3440",
            "editorGroupHeader.tabsBorder": "#3b425200",
            "editorGutter.background": "#2e3440",
            "editorGutter.modifiedBackground": "#ebcb8b",
            "editorGutter.addedBackground": "#a3be8c",
            "editorGutter.deletedBackground": "#bf616a",
            "editorHoverWidget.background": "#3b4252",
            "editorHoverWidget.border": "#3b4252",
            "editorLink.activeForeground": "#88c0d0",
            "editorMarkerNavigation.background": "#5e81acc0",
            "editorMarkerNavigationError.background": "#bf616ac0",
            "editorMarkerNavigationWarning.background": "#ebcb8bc0",
            "editorOverviewRuler.border": "#3b4252",
            "editorOverviewRuler.currentContentForeground": "#3b4252",
            "editorOverviewRuler.incomingContentForeground": "#3b4252",
            "editorOverviewRuler.findMatchForeground": "#88c0d066",
            "editorOverviewRuler.rangeHighlightForeground": "#88c0d066",
            "editorOverviewRuler.selectionHighlightForeground": "#88c0d066",
            "editorOverviewRuler.wordHighlightForeground": "#88c0d066",
            "editorOverviewRuler.wordHighlightStrongForeground": "#88c0d066",
            "editorOverviewRuler.modifiedForeground": "#ebcb8b",
            "editorOverviewRuler.addedForeground": "#a3be8c",
            "editorOverviewRuler.deletedForeground": "#bf616a",
            "editorOverviewRuler.errorForeground": "#bf616a",
            "editorOverviewRuler.warningForeground": "#ebcb8b",
            "editorOverviewRuler.infoForeground": "#81a1c1",
            "editorRuler.foreground": "#434c5e",
            "editorSuggestWidget.background": "#2e3440",
            "editorSuggestWidget.border": "#3b4252",
            "editorSuggestWidget.foreground": "#d8dee9",
            "editorSuggestWidget.focusHighlightForeground": "#88c0d0",
            "editorSuggestWidget.highlightForeground": "#88c0d0",
            "editorSuggestWidget.selectedBackground": "#434c5e",
            "editorSuggestWidget.selectedForeground": "#d8dee9",
            "extensionButton.prominentForeground": "#d8dee9",
            "extensionButton.prominentBackground": "#434c5e",
            "extensionButton.prominentHoverBackground": "#4c566a",
            errorForeground: "#bf616a",
            "minimap.background": "#2e3440",
            "minimap.errorHighlight": "#bf616acc",
            "minimap.findMatchHighlight": "#88c0d0",
            "minimap.selectionHighlight": "#88c0d0cc",
            "minimap.warningHighlight": "#ebcb8bcc",
            "minimapGutter.addedBackground": "#a3be8c",
            "minimapGutter.deletedBackground": "#bf616a",
            "minimapGutter.modifiedBackground": "#ebcb8b",
            "minimapSlider.activeBackground": "#434c5eaa",
            "minimapSlider.background": "#434c5e99",
            "minimapSlider.hoverBackground": "#434c5eaa",
            "scrollbar.shadow": "#00000066",
            "scrollbarSlider.activeBackground": "#434c5eaa",
            "scrollbarSlider.background": "#434c5e99",
            "scrollbarSlider.hoverBackground": "#434c5eaa",
            "selection.background": "#88c0d099",
            "sideBar.background": "#2e3440",
            "sideBar.foreground": "#d8dee9",
            "sideBar.border": "#3b4252",
            "sideBarSectionHeader.background": "#3b4252",
            "sideBarSectionHeader.foreground": "#d8dee9",
            "sideBarTitle.foreground": "#d8dee9",
            "tab.activeBackground": "#3b4252",
            "tab.activeForeground": "#d8dee9",
            "tab.border": "#3b425200",
            "tab.activeBorder": "#88c0d000",
            "tab.unfocusedActiveBorder": "#88c0d000",
            "tab.inactiveBackground": "#2e3440",
            "tab.inactiveForeground": "#d8dee966",
            "tab.unfocusedActiveForeground": "#d8dee999",
            "tab.unfocusedInactiveForeground": "#d8dee966",
            "tab.hoverBackground": "#3b4252cc",
            "tab.unfocusedHoverBackground": "#3b4252b3",
            "tab.hoverBorder": "#88c0d000",
            "tab.unfocusedHoverBorder": "#88c0d000",
            "tab.activeBorderTop": "#88c0d000",
            "tab.unfocusedActiveBorderTop": "#88c0d000",
            "tab.lastPinnedBorder": "#4c566a",
            "textBlockQuote.background": "#3b4252",
            "textBlockQuote.border": "#81a1c1",
            "textCodeBlock.background": "#4c566a",
            "textLink.activeForeground": "#88c0d0",
            "textLink.foreground": "#88c0d0",
            "textPreformat.foreground": "#8fbcbb",
            "textSeparator.foreground": "#eceff4",
        },
    });
    monaco.editor.setTheme("nord");

    return monaco.editor.create(document.querySelector("#code"), {
        value: "// You Can Code Here\n",
        language: "javascript",
        scrollBeyondLastLine: false,
        fontSize: 14,
    });
}
