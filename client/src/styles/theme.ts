import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
    token: {
        fontSize: 12,
        colorPrimary: 'black',
    },
    components: {
        Form: {
            itemMarginBottom: 10,
            labelFontSize: 10,
            verticalLabelPadding: 0,
        },
        Typography: {
            colorLinkHover: '#000000',
        },
        Menu: {
            itemPaddingInline: 14,
            lineType: 'none',
            itemBg: 'none',
            activeBarHeight: 0,
        },
        Tabs: {
            colorBgContainer: 'black',
            cardPadding: '0.5rem 1.5rem',
            itemHoverColor: '#737272',
            itemColor: 'black',
            itemSelectedColor: 'white',
        },
        Input: {
            hoverBorderColor: 'black',
            activeBorderColor: 'black',
            activeShadow: 'none',
        },
    },
}

export default theme
