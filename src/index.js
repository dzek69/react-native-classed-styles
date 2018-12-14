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

        const result = {
            ...styles,
        };

        classes.forEach(name => {
            if (!classedStyles[name]) {
                return;
            }
            Object.entries(classedStyles[name]).forEach(([selector, value]) => {
                result[selector] = {
                    ...result[selector],
                    ...value,
                };
            });
        });

        cache[className] = result;
        return result;
    };
};

export default createClassedStyles;
