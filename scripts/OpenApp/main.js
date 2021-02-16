const init = () => {
        const shareLink = $context.link;
        if (shareLink) {
            goApp(shareLink);
        } else {
        }
    },
    goApp = _url => {};
init();