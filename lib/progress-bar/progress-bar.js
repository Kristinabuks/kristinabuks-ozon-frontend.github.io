const strokeToRadius = 0.2;
const radius = 100 / (2 + strokeToRadius);
const stroke = strokeToRadius * radius;
const p = 3.14159265358979 * 2 * radius; // вместо Math.PI, чтобы согласовать с CSS

function calcStrokeOffset(value) {
    return toPercent(p - (p * value) / 100);
}

function toPercent(v) {
    return `${v}%`;
}

class ProgressBar {
    constructor() {
        this._value = 0;
        this._circle = null;
        this._svgContainer = null;
    }

    render() {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", toPercent(100));
        svg.setAttribute("height", toPercent(100));

        this._circle = document.createElementNS(svg.namespaceURI, "circle");
        this._circle.style.strokeDashoffset = calcStrokeOffset(0);
        this._circle.setAttribute("cx", toPercent(0));
        this._circle.setAttribute("cy", toPercent(0));
        this._circle.setAttribute("r", toPercent(radius));
        this._circle.classList.add(
            "progress-bar-svg-progress",
            "progress-bar-svg-progress-normal",
        );

        let shadow = document.createElementNS(svg.namespaceURI, "circle");
        shadow.setAttribute("cx", toPercent(0));
        shadow.setAttribute("cy", toPercent(0));
        shadow.setAttribute("r", toPercent(radius));
        shadow.classList.add("progress-bar-svg-shadow");

        svg.appendChild(shadow);
        svg.appendChild(this._circle);

        this._svgContainer = document.createElement("div");
        this._svgContainer.classList.add("progress-bar-svg-container");
        this._svgContainer.appendChild(svg);

        this._circle.style.strokeDashoffset = calcStrokeOffset(this._value);

        return this._svgContainer;
    }

    setValue(value) {
        if (value < 0 || value > 100) {
            throw Error(`unexpected value ${value}`);
        }

        this._value = value;

        if (this._circle !== null) {
            this._circle.style.strokeDashoffset = calcStrokeOffset(this._value);
        }
    }

    setAnimated(isAnimated) {
        if (this._circle !== null) {
            if (isAnimated) {
                this._circle.classList.replace(
                    "progress-bar-svg-progress-normal",
                    "progress-bar-svg-progress-animating",
                );
            } else {
                this._circle.classList.replace(
                    "progress-bar-svg-progress-animating",
                    "progress-bar-svg-progress-normal",
                );
            }
        }
    }

    setHidden(isHidden) {
        if (this._svgContainer !== null) {
            if (isHidden) {
                this._svgContainer.classList.add(
                    "progress-bar-svg-container-hidden",
                );
            } else {
                this._svgContainer.classList.remove(
                    "progress-bar-svg-container-hidden",
                );
            }
        }
    }
}
