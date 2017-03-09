import { ParagraphProperties } from "../../docx/paragraph/properties";
import { RunProperties } from "../../docx/run/properties";
import { XmlAttributeComponent, XmlComponent } from "../../docx/xml-components";

import { BasedOn, Name, Next, QuickFormat } from "./components";

export interface IStyleAttributes {
    type?: string;
    styleId?: string;
    default?: boolean;
    customStyle?: string;
}

class StyleAttributes extends XmlAttributeComponent {
    private _attr: IStyleAttributes;

    constructor(properties: IStyleAttributes) {
        super({
            type: "w:type",
            styleId: "w:styleId",
            default: "w:default",
            customStyle: "w:customStyle",
        }, properties);
    }
}

export class Style extends XmlComponent {

    constructor(attributes: IStyleAttributes) {
        super("w:style");
        this.root.push(new StyleAttributes(attributes));
    }

    public push(styleSegment: XmlComponent): void {
        this.root.push(styleSegment);
    }
}

export class ParagraphStyle extends Style {

    private paragraphProperties: ParagraphProperties;
    private runProperties: RunProperties;

    constructor(styleId: string) {
        super({type: "paragraph", styleId: styleId});
        this.paragraphProperties = new ParagraphProperties();
        this.runProperties = new RunProperties();
        this.root.push(this.paragraphProperties);
        this.root.push(this.runProperties);
    }

    public clearVariables(): void {
        this.paragraphProperties.clearVariables();
        this.runProperties.clearVariables();
        delete this.paragraphProperties;
        delete this.runProperties;
    }

    public addParagraphProperty(property: XmlComponent): void {
        this.paragraphProperties.push(property);
    }

    public addRunProperty(property: XmlComponent): void {
        this.runProperties.push(property);
    }
}

export class HeadingStyle extends ParagraphStyle {

    constructor(styleId: string, name: string) {
        super(styleId);
        this.root.push(new Name(name));
        this.root.push(new BasedOn("Normal"));
        this.root.push(new Next("Normal"));
        this.root.push(new QuickFormat());
    }
}

export class TitleStyle extends HeadingStyle {

    constructor() {
        super("Title", "Title");
    }
}

export class Heading1Style extends HeadingStyle {

    constructor() {
        super("Heading1", "Heading 1");
    }
}

export class Heading2Style extends HeadingStyle {

    constructor() {
        super("Heading2", "Heading 2");
    }
}

export class Heading3Style extends HeadingStyle {

    constructor() {
        super("Heading3", "Heading 3");
    }
}

export class Heading4Style extends HeadingStyle {

    constructor() {
        super("Heading4", "Heading 4");
    }
}

export class Heading5Style extends HeadingStyle {

    constructor() {
        super("Heading5", "Heading 5");
    }
}

export class Heading6Style extends HeadingStyle {

    constructor() {
        super("Heading6", "Heading 6");
    }
}

export class ListParagraph extends ParagraphStyle {

    constructor() {
        super("ListParagraph");
        this.root.push(new Name("List Paragraph"));
        this.root.push(new BasedOn("Normal"));
        this.root.push(new QuickFormat());
    }
}
