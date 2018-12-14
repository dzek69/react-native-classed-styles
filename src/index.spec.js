import getClassedStyles from "./index";

const styles = {
    container: {
        fontSize: 10,
    },
    button: {
        zIndex: 111,
    },
};

const classes = {
    big: {
        container: {
            fontSize: 15,
            width: 100,
        },
    },
    red: {
        container: {
            color: "red",
        },
    },
    green: {
        container: {
            color: "green",
        },
    },
    linkOnly: {
        link: {
            textTransform: "lowercase",
        },
    },
};

describe("getClassedStyle", () => {
    it("returns a function", () => {
        const getStyles = getClassedStyles(styles, classes);
        getStyles.must.be.a.function();
    });

    it("returns base styles", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles();
        style.must.eql({
            container: {
                fontSize: 10,
            },
            button: {
                zIndex: 111,
            },
        });
    });

    it("returns single classed styles", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("green");
        style.must.eql({
            container: {
                fontSize: 10,
                color: "green",
            },
            button: {
                zIndex: 111,
            },
        });
    });

    it("returns single classed styles with overwrite", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("big");
        style.must.eql({
            container: {
                fontSize: 15,
                width: 100,
            },
            button: {
                zIndex: 111,
            },
        });
    });

    it("returns multiple classed styles with double overwrite", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("green red");
        style.must.eql({
            container: {
                fontSize: 10,
                color: "red",
            },
            button: {
                zIndex: 111,
            },
        });
    });

    it("returns multiple classed styles with overwrite by same class", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("big green red green");
        style.must.eql({
            container: {
                fontSize: 15,
                width: 100,
                color: "green",
            },
            button: {
                zIndex: 111,
            },
        });
    });

    it("returns styles for invalid classes", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("karma");
        style.must.eql({
            container: {
                fontSize: 10,
            },
            button: {
                zIndex: 111,
            },
        });
    });

    it("works when only class has certain selector", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("linkOnly");
        style.must.eql({
            container: {
                fontSize: 10,
            },
            button: {
                zIndex: 111,
            },
            link: {
                textTransform: "lowercase",
            },
        });
    });

    it("caches/memoizes result", () => {
        const getStyles = getClassedStyles(styles, classes);
        getStyles("red karma linkOnly").must.equal(getStyles("red karma linkOnly"));

        getStyles("red karma linkOnly").must.not.equal(getStyles("red karma linkOnly ")); // mind the gap
        getStyles("red karma linkOnly").must.eql(getStyles("red karma linkOnly ")); // mind the gap
    });

    it("doesn't do deep merge, so transforms are overwritten", () => {
        const deepStyles = {
            container: {
                transform: [{ scale: 5 }, { rotate: 100 }],
            },
        };

        const deepClasses = {
            light: {
                container: {
                    transform: [{ rotate: 69 }],
                },
            },
        };

        const getStyles = getClassedStyles(deepStyles, deepClasses);

        getStyles("light").must.eql({
            container: {
                transform: [{ rotate: 69 }],
            },
        });
    });

    // @todo tests/support for spaces inside keys
    // @todo overwriting with nulls
});
