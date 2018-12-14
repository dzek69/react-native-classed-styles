const createClassedStyles = (styles, classedStyles) => {
    const cache = {};

    return (className) => {
        if (typeof className !== "string") {
            return styles;
        }

        const cached = cache[className];
        if (cached) {
            return cached;
        }

        const classes = className.split(" ");

        const selectors = Object.keys(styles);
        Object.values(classedStyles).forEach(currentStyles => {
            selectors.push(...Object.keys(currentStyles));
        });
        const uniqueSelectors = Array.from(new Set(selectors));

        const result = {};
        uniqueSelectors.forEach(selector => {
            let cachedSelector;

            Object.defineProperty(result, selector, {
                get: () => {
                    if (cachedSelector) {
                        return cachedSelector;
                    }

                    const selectorResult = [];
                    if (styles[selector]) {
                        selectorResult.push(styles[selector]);
                    }
                    classes.forEach(currentClass => {
                        if (classedStyles[currentClass] && classedStyles[currentClass][selector]) {
                            selectorResult.push(classedStyles[currentClass][selector]);
                        }
                    });
                    cachedSelector = selectorResult.length === 1 ? selectorResult[0] : selectorResult;
                    return cachedSelector;
                },
                enumerable: true,
                configurable: false,
            });
        });

        // classes.forEach(name => {
        //     if (!classedStyles[name]) {
        //         return;
        //     }
        //     Object.entries(classedStyles[name]).forEach(([selector, value]) => {
        //         result[selector] = {
        //             ...result[selector],
        //             ...value,
        //         };
        //     });
        // });

        cache[className] = result;
        return result;
    };
};

export default createClassedStyles;
