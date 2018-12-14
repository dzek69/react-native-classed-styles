import getClassedStyles from "./index";

const defaultContainerStyle = {
    fontSize: 10,
};
const defaultButtonStyle = {
    zIndex: 111,
};

const styles = {
    container: defaultContainerStyle,
    button: defaultButtonStyle,
};

const bigContainerStyle = {
    fontSize: 15,
    width: 100,
};

const redContainerStyle = {
    color: "red",
};

const greenContainerStyle = {
    color: "green",
};

const linkLinkStyle = {
    textTransform: "lowercase",
};

const classes = {
    big: {
        container: bigContainerStyle,
    },
    red: {
        container: redContainerStyle,
    },
    green: {
        container: greenContainerStyle,
    },
    linkOnly: {
        link: linkLinkStyle,
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
        style.must.eql(styles);
    });

    it("returns single classed styles", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("green");
        style.must.eql({
            container: [defaultContainerStyle, greenContainerStyle],
            button: defaultButtonStyle,
            link: [],
        });
    });

    it("returns single classed styles with overwrite", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("big");
        style.must.eql({
            container: [defaultContainerStyle, bigContainerStyle],
            button: defaultButtonStyle,
            link: [],
        });
    });

    it("returns multiple classed styles with double overwrite", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("green red");
        style.must.eql({
            container: [defaultContainerStyle, greenContainerStyle, redContainerStyle],
            button: defaultButtonStyle,
            link: [],
        });
    });

    it("returns multiple classed styles with overwrite by same class", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("big green red green");
        style.must.eql({
            container: [
                defaultContainerStyle, bigContainerStyle, greenContainerStyle, redContainerStyle, greenContainerStyle,
            ],
            button: defaultButtonStyle,
            link: [],
        });
    });

    it("returns styles for invalid classes", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("karma");
        style.must.eql({
            container: defaultContainerStyle,
            button: defaultButtonStyle,
            link: [],
        });
    });

    it("works when only class has certain selector", () => {
        const getStyles = getClassedStyles(styles, classes);
        const style = getStyles("linkOnly");
        style.must.eql({
            container: defaultContainerStyle,
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
        getStyles("red karma linkOnly").container.must.equal(getStyles("red karma linkOnly").container);

        getStyles("red karma linkOnly").must.not.equal(getStyles("red karma linkOnly ")); // mind the gap
        getStyles("red karma linkOnly").container.must.not.equal(getStyles("red karma linkOnly ").container);

        getStyles("red karma linkOnly").must.eql(getStyles("red karma linkOnly ")); // mind the gap
        getStyles("red karma linkOnly").container.must.eql(getStyles("red karma linkOnly ").container);
    });

    // @todo tests/support for spaces inside keys
});
