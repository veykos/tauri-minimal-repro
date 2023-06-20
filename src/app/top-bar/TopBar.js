import m from 'mithril';

function TopBar() {
    return {
        view: function(vnode) {
            return m('div', {
                ['data-tauri-drag-region']: true,
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#1f3d7a',
                    height: '3.6rem',
                    width: '100%',
                }
            });
        }
    };
}

export default TopBar;