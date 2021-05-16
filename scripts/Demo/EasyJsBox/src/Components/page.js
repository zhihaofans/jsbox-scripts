class Controller {
    constructor(data) {
        Object.assign(this, data)
    }

    getView() {
        return this.view.getView()
    }

    setPages(pages) {
        this.dataCenter.set("pages", pages)
    }

    /**
     * 设置当前选中的页面
     * @param {Number} index 页面索引
     */
    setSelectedPage(index) {
        this.dataCenter.set("selectedPage", index)
    }
}

class View {
    constructor(data) {
        Object.assign(this, data)
        this.dataCenter.set("selectedPage", 0)
        this.dataCenter.set("pageIdPrefix", "page-")
    }

    /**
     * 创建一个页面
     * @param {Array} views 页面内容
     * @param {Number} index 页面索引，需要和菜单对应
     * @param {Boolean} isHorizontalSafeArea 是否水平方向自动裁剪到安全距离
     */
    creator(views, index, isHorizontalSafeArea = true) {
        return {
            type: "view",
            props: {
                id: `${this.dataCenter.get("pageIdPrefix")}${index}`,
                hidden: this.dataCenter.get("selectedPage") !== index,
                clipsToBounds: true
            },
            layout: (make, view) => {
                make.top.bottom.equalTo(view.super)
                if (isHorizontalSafeArea) {
                    make.left.right.equalTo(view.super.safeArea)
                } else {
                    make.left.right.equalTo(view.super)
                }
            },
            views: views
        }
    }

    getView() {
        return {
            type: "view",
            props: { clipsToBounds: true },
            layout: $layout.fill,
            views: this.dataCenter.get("pages")
        }
    }
}

module.exports = { Controller, View, VERSION: "1.0.0" }