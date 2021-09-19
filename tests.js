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
    {
        name: "Challenge 3: 基本運算",
        description: `1. 建立一個函式「add」，其需要 2 個參數，執行時，回傳兩參數相加值。\n2. 建立一個函式「diff」，其需要 2 個參數，執行時，回傳兩參數相減之正值。\n3. 建立一個函式「times」，其需要 2 個參數，執行時，回傳兩參數相乘值。\n4. 建立一個函式「divide」，其需要 2 個參數，執行時，回傳第一個參數除以第二個參數之值。\n5. 建立一個函式「remainder」，其需要 2 個參數，執行時，回傳第一個參數除以第二個參數之餘數值。\n6. 建立一個函式「pow」，其需要 2 個參數 (a, b)，執行時，回傳 a<sup>b</sup> 之值。\nPS: Math 被我封鎖了，你不能用。`,
        test: () => {
            let tasks = [];
            (() => {
                let task = {
                    name: "建立函式 add",
                    passed: typeof add === "function",
                };
                if (task.passed)
                    try {
                        task.passed =
                            add(1, 2) === 3 &&
                            add(2, 2) === 4 &&
                            add(-3, 3) === 0;
                    } catch {
                        task.passed = false;
                    }
                tasks.push(task);
            })();
            (() => {
                let task = {
                    name: "建立函式 diff",
                    passed: typeof diff === "function",
                };
                if (task.passed)
                    try {
                        task.passed =
                            diff(1, 2) === 1 &&
                            diff(2, 2) === 0 &&
                            diff(-8, -2) === 6;
                    } catch {
                        task.passed = false;
                    }
                tasks.push(task);
            })();
            (() => {
                let task = {
                    name: "建立函式 times",
                    passed: typeof times === "function",
                };
                if (task.passed)
                    try {
                        task.passed =
                            times(8, 2) === 16 &&
                            times(-7, -2) === 14 &&
                            times(-18, 3) === -54;
                    } catch {
                        task.passed = false;
                    }
                tasks.push(task);
            })();
            (() => {
                let task = {
                    name: "建立函式 divide",
                    passed: typeof divide === "function",
                };
                if (task.passed)
                    try {
                        task.passed =
                            divide(8, 2) === 4 &&
                            divide(-7, -2) === 3.5 &&
                            divide(-18, 3) === -6;
                    } catch {
                        task.passed = false;
                    }
                tasks.push(task);
            })();
            (() => {
                let task = {
                    name: "建立函式 remainder",
                    passed: typeof remainder === "function",
                };
                if (task.passed)
                    try {
                        task.passed =
                            remainder(8, 2) === 0 &&
                            remainder(-7, -2) === -1 &&
                            remainder(100, -7) === 2;
                    } catch {
                        task.passed = false;
                    }
                tasks.push(task);
            })();
            (() => {
                let task = {
                    name: "建立函式 pow",
                    passed: typeof pow === "function",
                };
                if (task.passed)
                    try {
                        task.passed =
                            pow(8, 2) === 64 &&
                            pow(2, 0.5) - 1.4142136 < 0.0000001 &&
                            pow(5, -1) === 0.2;
                    } catch {
                        task.passed = false;
                    }
                tasks.push(task);
            })();

            return { tasks };
        },
    },
];

export default tests;
