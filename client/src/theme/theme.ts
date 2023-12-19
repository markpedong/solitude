import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
    token: {
        fontSize: 12,
        colorPrimary: '##000000',
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
    },
}

export default theme
