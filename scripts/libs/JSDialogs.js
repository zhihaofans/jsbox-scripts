//components
class BaseView {
    constructor() {
        this.id = idManager.newId;
    }

    get definition() {
        return this._defineView();
    }

    get created() {
        if (this._view) {
            return this._view;
        } else {
            this._view = $ui.create(this.definition);
            return this._view;
        }
    }

    get view() {
        if (this._view) {
            return this._view;
        } else {
            this._view = $(this.id);
            return this._view;
        }
    }

    add(view) {
        this.view.add(view);
    }

    moveToFront() {
        this.view.moveToFront();
    }

    moveToBack() {
        this.view.moveToBack();
    }
}
//Utils
const l10nRes = {
    CANCEL: {
        "zh-Hans": "取消",
        en: "Cancel"
    }
};

function $$l10n(str_id) {
    let result = "";
    if (str_id) {
        const str_res = l10nRes[str_id];
        if (str_res) {
            result = str_res[$device.info.language] || $l10n(str_id);
        } else {
            result = $l10n(str_id);
        }
    } else {
        result = str_id;
    }
    return result;
}
class ID {
    constructor({ prefix = "id_", startNumber = 0 } = {}) {
        this.prefix = prefix;
        this.number = startNumber;
        this._aliasIds = {};
    }

    get newId() {
        return this.generateNewIdWithAlias();
    }

    generateNewIdWithAlias(alias) {
        const number = this.number;
        this.number++;
        const id = this.prefix + number;
        if (alias) {
            this._addIdToAlias(alias, id);
        }
        return id;
    }

    getAliasId(alias) {
        const ids = this._aliasIds[alias];
        if (ids) {
            return ids[0];
        } else {
            return;
        }
    }

    getAliasAllIds(alias) {
        const ids = this._aliasIds[alias];
        if (ids) {
            return ids;
        } else {
            return;
        }
    }

    _addIdToAlias(alias, id) {
        if (!this._aliasIds[alias]) this._aliasIds[alias] = [];
        this._aliasIds[alias].push(id);
    }
}

const idManager = new ID();
// 计算特定字号的文字长度
// 此函数不应该用于处理超长文本
function getTextSize(text, { font = $font(17) } = {}) {
    return $text.sizeThatFits({
        text,
        width: 10000,
        font,
        align: $align.center,
        lineSpacing: 0
    });
}
//UIAlert
const UIAlertActionStyle = {
        Default: 0,
        Cancel: 1,
        Destructive: 2
    },
    UIAlertControllerStyle = {
        ActionSheet: 0,
        Alert: 1
    };
class UIAlertAction {
    constructor(title, style = UIAlertActionStyle.Default, handler) {
        this.title = title;
        this.style = style;
        this.instance = $objc("UIAlertAction").$actionWithTitle_style_handler(
            title,
            style,
            $block("void, UIAlertAction *", () => {
                if (handler) {
                    handler(this);
                }
            })
        );
    }
}

class UIAlertController {
    constructor(title, message, style = UIAlertControllerStyle.ActionSheet) {
        this.title = title;
        this.message = message;
        this.style = style;
        this.instance = $objc(
            "UIAlertController"
        ).$alertControllerWithTitle_message_preferredStyle(
            title,
            message,
            style
        );
    }
    addAction(action) {
        this.instance.$addAction(action.instance);
    }
    addTextField(options) {
        this.instance.$addTextFieldWithConfigurationHandler(
            $block("void, UITextField *", textField => {
                textField.$setClearButtonMode(1);

                if (options.type) {
                    textField.$setKeyboardType(options.type);
                }
                if (options.placeholder) {
                    textField.$setPlaceholder(options.placeholder);
                }
                if (options.text) {
                    textField.$setText(options.text);
                }
                if (options.textColor) {
                    textField.$setTextColor(options.textColor.ocValue());
                }
                if (options.font) {
                    textField.$setFont(options.font.ocValue());
                }
                if (options.align) {
                    textField.$setTextAlignment(options.align);
                }
                if (options.secure) {
                    textField.$setSecureTextEntry(true);
                }
                if (options.events) {
                    const events = options.events;
                    textField.$setDelegate(
                        $delegate({
                            type: "UITextFieldDelegate",
                            events: {
                                "textFieldShouldReturn:": textField => {
                                    if (events.shouldReturn) {
                                        return events.shouldReturn();
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        })
                    );
                }
            })
        );
    }
    getText(index) {
        const textField = this.instance.$textFields().$objectAtIndex(index);
        const text = textField.$text();
        return text.jsValue();
    }
    present() {
        this.instance.$show();
    }
}

class Cell extends BaseView {
    constructor(
        {
            type,
            key,
            title,
            value,
            titleColor = $color("primaryText"),
            iconColor = $color("tintColor"),
            icon,
            iconEdgeInsets = $insets(12, 12, 12, 12),
            disabled
        } = { type }
    ) {
        super();
        this.type = type;
        this.key = key;
        this.title = title;
        this.value = value;
        this.titleColor = titleColor;
        this.iconColor = iconColor;
        this.icon = icon;
        this.iconEdgeInsets = iconEdgeInsets;
        this.disabled = disabled;
    }

    _defineView() {
        return {
            type: "view",
            props: {
                userInteractionEnabled: !this.disabled
            },
            layout: $layout.fill,
            views: this.icon
                ? [
                      this._defineIconView(),
                      this._defineTitleView(),
                      this._defineValueView()
                  ]
                : [this._defineTitleView(), this._defineValueView()]
        };
    }

    _defineTitleView() {
        return {
            type: "label",
            props: {
                id: "title",
                text: this.title,
                textColor: this.titleColor,
                font: $font(17)
            },
            layout: function (make, view) {
                const icon = view.super.get("icon");
                make.height.equalTo(89 / 2);
                make.width.equalTo(getTextSize(view.text).width + 10);
                make.top.inset(0);
                if (icon) {
                    make.left.equalTo(icon.right).inset(10);
                } else {
                    make.left.inset(15);
                }
            }
        };
    }

    _defineIconView() {
        const classThis = this;
        return {
            type: "view",
            props: {
                id: "icon"
            },
            views: [
                {
                    type: "image",
                    props: {
                        id: "icon",
                        tintColor: this.iconColor,
                        image: this.icon.alwaysTemplate
                    },
                    layout: function (make, view) {
                        make.edges.insets(classThis.iconEdgeInsets);
                    }
                }
            ],
            layout: function (make, view) {
                make.size.equalTo($size(89 / 2, 89 / 2));
                make.left.inset(10);
            }
        };
    }
}

class BaseStringCell extends Cell {
    constructor(props, values) {
        super(props);
        const {
            autocorrectionType = 0,
            autocapitalizationType = 0,
            spellCheckingType = 0,
            placeholder,
            textColor
        } = props;
        this.autocorrectionType = autocorrectionType;
        this.autocapitalizationType = autocapitalizationType;
        this.spellCheckingType = spellCheckingType;
        this.placeholder = placeholder;
        this.textColor = textColor;
        this.values = values;
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "input",
            props: {
                id: "valueView",
                text: this._handleText(this.value),
                kbType: this.kbType,
                align: $align.left,
                textColor: this.textColor,
                bgcolor: $color("clear"),
                placeholder: this.placeholder,
                secure: this.secure,
                autocorrectionType: this.autocorrectionType,
                autocapitalizationType: this.autocapitalizationType,
                spellCheckingType: this.spellCheckingType
            },
            layout: function (make, view) {
                make.top.bottom.inset(0);
                make.left.equalTo(view.prev.right).inset(10);
                make.right.inset(15);
            },
            events: {
                changed: function (sender) {
                    if (classThis.key)
                        classThis.values[classThis.key] = classThis._handleText(
                            sender.text
                        );
                },
                didEndEditing: function (sender) {
                    const result = classThis._handleText(sender.text);
                    sender.text = result;
                    if (classThis.key)
                        classThis.values[classThis.key] = classThis._handleText(
                            result
                        );
                },
                returned: function (sender) {
                    sender.blur();
                }
            }
        };
    }
}

class StringCell extends BaseStringCell {
    constructor(props, values) {
        super(props, values);
    }

    _handleText(text) {
        return text;
    }
}

class NumberCell extends BaseStringCell {
    constructor(props, values) {
        super(props, values);
        this.kbType = $kbType.number;
    }

    _handleText(text) {
        return parseFloat(text);
    }
}

class IntegerCell extends BaseStringCell {
    constructor(props, values) {
        super(props, values);
        this.kbType = $kbType.number;
    }

    _handleText(text) {
        return parseInt(text);
    }
}

class PasswordCell extends BaseStringCell {
    constructor(props, values) {
        super(props, values);
        this.kbType = $kbType.ascii;
        this.secure = true;
    }

    _handleText(text) {
        return text;
    }
}

class BooleanCell extends Cell {
    constructor(props, values) {
        super(props);
        const { onColor, thumbColor } = props;
        this.onColor = onColor;
        this.thumbColor = thumbColor;
        this.values = values;
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "switch",
            props: {
                id: "valueView",
                on: this.value,
                onColor: this.onColor,
                thumbColor: this.thumbColor
            },
            layout: function (make, view) {
                make.size.equalTo($size(51, 31));
                make.centerY.equalTo(view.super);
                make.right.inset(15);
            },
            events: {
                changed: function (sender) {
                    if (classThis.key)
                        classThis.values[classThis.key] = sender.on;
                }
            }
        };
    }
}

class SliderCell extends Cell {
    constructor(props, values) {
        super(props);
        const {
            decimal = 1,
            min = 0,
            max = 1,
            minColor,
            maxColor,
            thumbColor
        } = props;
        this.decimal = decimal;
        this.min = min;
        this.max = max;
        this.minColor = minColor;
        this.maxColor = maxColor;
        this.thumbColor = thumbColor;
        this.values = values;
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "view",
            props: {
                id: "valueView"
            },
            views: [
                {
                    type: "label",
                    props: {
                        id: "sliderValue",
                        text: this.value.toFixed(this.decimal),
                        align: $align.right
                    },
                    layout: function (make, view) {
                        make.top.right.bottom.inset(0);
                        make.width.equalTo(30);
                    }
                },
                {
                    type: "slider",
                    props: {
                        id: "slider",
                        value: this.value,
                        max: this.max,
                        min: this.min,
                        minColor: this.minColor,
                        maxColor: this.maxColor,
                        thumbColor: this.thumbColor,
                        continuous: true
                    },
                    layout: function (make, view) {
                        make.top.left.bottom.inset(0);
                        make.right.equalTo(view.prev.left);
                    },
                    events: {
                        changed: function (sender) {
                            const adjustedValue = sender.value.toFixed(
                                classThis.decimal
                            );
                            sender.prev.text = adjustedValue;
                            if (classThis.key)
                                classThis.values[classThis.key] = parseFloat(
                                    adjustedValue
                                );
                        }
                    }
                }
            ],
            layout: function (make, view) {
                make.top.bottom.inset(0);
                make.left.equalTo(view.prev.right).inset(10);
                make.right.inset(15);
            }
        };
    }
}

class ListCell extends Cell {
    constructor(props, values) {
        super(props);
        const { items, listType = "menu" } = props;
        this.items = items;
        this.listType = listType;
        this.values = values;
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "label",
            props: {
                id: "valueView",
                text: this.value,
                textColor: $color("tintColor"),
                align: $align.right,
                userInteractionEnabled: true
            },
            events: {
                tapped: async function (sender) {
                    let title;
                    if (classThis.listType === "menu") {
                        const result = await $ui.menu({
                            items: classThis.items
                        });
                        title = result.title;
                    } else if (classThis.listType === "popover") {
                        const result = await $ui.popover({
                            sourceView: sender.super,
                            sourceRect: sender.super.bounds,
                            directions: $popoverDirection.up,
                            size: $size(320, 200),
                            items: classThis.items
                        });
                        title = result.title;
                    }
                    if (title) {
                        sender.text = title;
                        if (classThis.key)
                            classThis.values[classThis.key] = title;
                    }
                }
            },
            layout: function (make, view) {
                make.top.bottom.inset(0);
                make.left.equalTo(view.prev.right).inset(10);
                make.right.inset(15);
            }
        };
    }
}

class SegmentedControlCell extends Cell {
    constructor(props, values) {
        super(props);
        const { items, index = -1 } = props;
        this.items = items;
        this.index = index;
        this.values = values;
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "tab",
            props: {
                id: "valueView",
                items: this.items,
                index: this.index
            },
            layout: function (make, view) {
                make.centerY.equalTo(view.super);
                make.height.equalTo(40);
                make.left.equalTo($("title").right).inset(10);
                make.right.inset(15);
            },
            events: {
                changed: function (sender) {
                    if (classThis.key)
                        classThis.values[classThis.key] = sender.index;
                }
            }
        };
    }
}

class DatetimeCell extends Cell {
    constructor(props, values) {
        super(props);
        const { min, max, mode = 0, interval = 1 } = props;
        this.min = min;
        this.max = max;
        this.mode = mode;
        this.interval = interval;
        this.values = values;
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "label",
            props: {
                id: "valueView",
                text: this.value.toISOString(),
                align: $align.right,
                userInteractionEnabled: true
            },
            layout: function (make, view) {
                make.right.inset(15);
                make.centerY.equalTo(view.super);
                make.left.equalTo(view.prev.right).inset(10);
                make.right.inset(15);
            },
            events: {
                tapped: async function (sender) {
                    const result = await $picker.date({
                        date: classThis.value,
                        min: classThis.min,
                        max: classThis.max,
                        mode: classThis.mode,
                        interval: classThis.interval
                    });
                    const date = new Date(result);
                    sender.text = date.toISOString();
                    if (classThis.key) classThis.values[classThis.key] = date;
                }
            }
        };
    }
}

class InfoCell extends Cell {
    constructor(props) {
        super(props);
    }

    _defineValueView() {
        return {
            type: "label",
            props: {
                id: "valueView",
                text: this.value,
                textColor: $color("secondaryText"),
                align: $align.right
            },
            layout: function (make, view) {
                make.top.bottom.inset(0);
                make.left.equalTo(view.prev.right).inset(10);
                make.right.inset(15);
            }
        };
    }
}

class LinkCell extends Cell {
    constructor(props) {
        super(props);
    }

    _defineValueView() {
        const classThis = this;
        return {
            type: "view",
            props: {
                id: "valueView"
            },
            views: [
                {
                    type: "label",
                    props: {
                        id: "valueView",
                        styledText: {
                            text: this.value,
                            font: $font(17),
                            userInteractionEnabled: true,
                            styles: [
                                {
                                    range: $range(0, this.value.length),
                                    link: this.value
                                }
                            ]
                        },
                        align: $align.right
                    },
                    layout: $layout.fill
                }
            ],
            layout: function (make, view) {
                make.top.bottom.inset(0);
                make.left.equalTo(view.prev.right).inset(10);
                make.right.inset(15);
            },
            events: {
                tapped: sender => {
                    $safari.open({
                        url: classThis.value
                    });
                }
            }
        };
    }
}

class ActionCell extends Cell {
    constructor(props) {
        super(props);
        const { buttonType = 0, buttonTitle } = props;
        this.buttonType = buttonType;
        this.buttonTitle = buttonTitle;
    }

    _defineValueView() {
        const classThis = this;
        if (this.buttonType === 0) {
            return {
                type: "button",
                props: {
                    id: "valueView",
                    title: this.buttonTitle,
                    titleColor: $color("tintColor"),
                    bgcolor: $color("clear"),
                    radius: 0
                },
                layout: function (make, view) {
                    make.top.bottom.inset(0);
                    make.left.equalTo(view.prev.left);
                    make.right.inset(15);
                },
                events: {
                    tapped: function (sender) {
                        classThis.value();
                    }
                }
            };
        } else if (this.buttonType === 1) {
            return {
                type: "button",
                props: {
                    id: "valueView",
                    title: this.buttonTitle
                },
                layout: function (make, view) {
                    make.top.bottom.inset(5);
                    make.width.equalTo(100);
                    make.right.inset(15);
                },
                events: {
                    tapped: function (sender) {
                        classThis.value();
                    }
                }
            };
        }
    }
}

//Alert
function plainAlert({
    title = "",
    message,
    cancelText = $$l10n("CANCEL"),
    confirmText = $$l10n("OK")
} = {}) {
    return new Promise((resolve, reject) => {
        const alertVC = new UIAlertController(
            title,
            message,
            UIAlertControllerStyle.Alert
        );
        alertVC.addAction(
            new UIAlertAction(
                cancelText,
                UIAlertActionStyle.Destructive,
                cancelEvent
            )
        );
        alertVC.addAction(
            new UIAlertAction(
                confirmText,
                UIAlertActionStyle.Default,
                confirmEvent
            )
        );
        alertVC.present();

        function confirmEvent() {
            resolve("ok");
        }

        function cancelEvent() {
            reject("cancel");
        }
    });
}

function inputAlert({
    title = "",
    message,
    text = "",
    placeholder,
    type = 0,
    cancelText = $$l10n("CANCEL"),
    confirmText = $$l10n("OK")
} = {}) {
    return new Promise((resolve, reject) => {
        const alertVC = new UIAlertController(
            title,
            message,
            UIAlertControllerStyle.Alert
        );
        alertVC.addTextField({
            placeholder,
            text,
            type,
            events: {
                shouldReturn: () => {
                    const input = alertVC.getText(0);
                    const isValid = input.length > 0;
                    return isValid;
                }
            }
        });
        alertVC.addAction(
            new UIAlertAction(
                cancelText,
                UIAlertActionStyle.Destructive,
                cancelEvent
            )
        );
        alertVC.addAction(
            new UIAlertAction(
                confirmText,
                UIAlertActionStyle.Default,
                confirmEvent
            )
        );
        alertVC.present();

        function confirmEvent() {
            const input = alertVC.getText(0);
            resolve(input);
        }

        function cancelEvent() {
            reject("cancel");
        }
    });
}

function loginAlert({
    title = "",
    message,
    placeholder1,
    placeholder2,
    cancelText = $$l10n("CANCEL"),
    confirmText = $$l10n("OK")
} = {}) {
    return new Promise((resolve, reject) => {
        const alertVC = new UIAlertController(
            title,
            message,
            UIAlertControllerStyle.Alert
        );
        alertVC.addTextField({
            placeholder: placeholder1
        });
        alertVC.addTextField({
            placeholder: placeholder2,
            secure: true,
            events: {
                shouldReturn: () => {
                    const username = alertVC.getText(0);
                    const password = alertVC.getText(1);
                    const isValid = username.length > 0 && password.length > 0;
                    return isValid;
                }
            }
        });
        alertVC.addAction(
            new UIAlertAction(
                cancelText,
                UIAlertActionStyle.Destructive,
                cancelEvent
            )
        );
        alertVC.addAction(
            new UIAlertAction(
                confirmText,
                UIAlertActionStyle.Default,
                confirmEvent
            )
        );
        alertVC.present();

        function confirmEvent() {
            const username = alertVC.getText(0);
            const password = alertVC.getText(1);
            resolve({
                username,
                password
            });
        }

        function cancelEvent() {
            reject("cancel");
        }
    });
}

class ListView extends BaseView {
    constructor({ sections, props, layout }) {
        super();
        this.sections = sections;
        this._values = {};
        const excludedTypes = ["action", "info", "link"];
        sections.forEach(section => {
            section.rows.forEach(row => {
                if (row.key && !excludedTypes.includes(row.type)) {
                    this._values[row.key] = row.value;
                }
            });
        });
        this._props = props;
        this._layout = layout;
    }
    _defineView() {
        return {
            type: "list",
            props: {
                ...this._props,
                id: this.id,
                data: this.sections.map(section => {
                    const title = section.title;
                    const rows = section.rows.map(
                        props => this._createCell(props).definition
                    );
                    return { title, rows };
                })
            },
            layout: this._layout
        };
    }
    _createCell(props) {
        const map = {
            string: StringCell,
            number: NumberCell,
            integer: IntegerCell,
            password: PasswordCell,
            boolean: BooleanCell,
            slider: SliderCell,
            list: ListCell,
            segmentedControl: SegmentedControlCell,
            datetime: DatetimeCell,
            info: InfoCell,
            link: LinkCell,
            action: ActionCell
        };
        const type = props.type;
        const Cell = map[type];
        return new Cell(props, this._values);
    }
    get values() {
        return this._values;
    }
}

//Usage
const showPlainAlert = async (title, message) => {
        return await plainAlert({
            title: title,
            message: message
        });
    },
    showInputAlert = async (title, message = "", text = "") => {
        return await inputAlert({
            title: title,
            message: message,
            text: text
        });
    },
    showLoginAlert = async title => {
        return await loginAlert({
            title: title
        });
    },
    showListDialogs = async (
        title,
        items,
        values,
        multiSelectEnabled = true,
        editable = true
    ) => {
        return await listDialogs({
            title: title,
            items: items,
            values: values,
            multiSelectEnabled: multiSelectEnabled,
            editable: editable
        });
    };
module.exports = {
    plainAlert,
    showPlainAlert,
    inputAlert,
    showInputAlert,
    loginAlert,
    showLoginAlert,
    listDialogs,
    showListDialogs
};
