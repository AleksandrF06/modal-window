$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onCLose() {
                modal.destroy()
            },
            footerButtons: [
                {text: 'Отмена', type: 'secondary', handler() {
            modal.close()
            reject()
        }},
        {text: 'Delete', type: 'danger', handler() {
            console.log('Danger btn clicked')
            modal.close()
            resolve()
        }}
            ]
        })
        modal.open()
    })
}