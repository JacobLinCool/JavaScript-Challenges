const tests = [
    {
        name: "Challenge 1: 變數與常數",
        description: `1. 建立一個變數「num」，其值為數字 123。 \n2. 建立一個常數「str」，其值為字串 "hello"。`,
        test: () => {
            let tasks = [];
            tasks.push({
                name: "建立變數 num",
                passed: typeof num === "number" && num === 123,
            });
            try {
                str += "more";
            } catch {}
            tasks.push({
                name: "建立常數 str",
                passed: typeof str === "string" && str === "hello",
            });
            return { tasks };
        },
    },
    {
        name: "Challenge 2: 函式",
        description: `1. 建立一個函式「say」，其需要 1 個參數「name」，執行時，回傳 "Hello, " + name。`,
        test: () => {
            let tasks = [];
            let passed = false;
            try {
                let result1 = say("Jacob");
                let result2 = say("Pascal");
                passed =
                    result1 === "Hello, Jacob" && result2 === "Hello, Pascal";
            } catch {}
            tasks.push({
                name: "建立函式 say",
                passed: passed,
            });
            return { tasks };
        },
    },
];

export default tests;
