const defaultProperties = [
    // required
    "Object",
    "Function",
    "Infinity",
    "NaN",
    "undefined",
    "caches",
    "TEMPORARY",
    "PERSISTENT",
    // optional
    "Array",
    "Boolean",
    "Number",
    "String",
    "Symbol",
    // "Map",
    // "Set",
    // "Math",
];

const defaultTest = `return { tasks: [] };`;

const defaultTimeout = 3000;

function sandbox(
    code,
    {
        properties = defaultProperties,
        timeout = defaultTimeout,
        test = defaultTest,
    } = {}
) {
    const Build_Start = Date.now();
    const id = Math.floor(Math.random() * 1e7)
        .toString(10)
        .padStart(7, "0");

    if (typeof test === "function") {
        test = `return (${test.toString()})();`;
    }

    return new Promise((resolve, reject) => {
        const blobURL = URL.createObjectURL(
            new Blob(
                [
                    "(",
                    function () {
                        addEventListener("message", (e) => {
                            const _postMessage = postMessage;
                            ((_this) => {
                                "use strict";
                                let current = _this;
                                while (current !== Object.prototype) {
                                    Object.getOwnPropertyNames(current).forEach(
                                        (name) => {
                                            if (
                                                e.data.properties.indexOf(
                                                    name
                                                ) === -1
                                            )
                                                delete current[name];
                                        }
                                    );
                                    current = Object.getPrototypeOf(current);
                                }
                            })(this);
                            var f = new Function(
                                "",
                                `${e.data.code};\n return { ...(()=>{${e.data.test}})(), id: "${e.data.id}" };`
                            );
                            _postMessage(f());
                        });
                    }.toString(),
                    ")()",
                ],
                { type: "application/javascript" }
            )
        );

        const worker = new Worker(blobURL);
        URL.revokeObjectURL(blobURL);

        worker.onmessage = (evt) => {
            worker.terminate();
            let result = evt.data;
            if (result.id !== id) return;
            delete result.id;
            resolve(result);
        };
        worker.onerror = (evt) => {
            worker.terminate();
            resolve({ error: evt.message });
        };
        console.log(`Test ${id}, Build Time: ${Date.now() - Build_Start} ms`);

        worker.postMessage({ code, id, properties, test });

        setTimeout(() => {
            worker.terminate();
            resolve({ error: "Timed Out." });
        }, timeout);
    });
}

export default sandbox;
