import { cormorant } from '@/app/page'
import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
    token: {
        fontSize: 12,
        colorPrimary: 'white',
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
            colorBgBase: '#ffffff',
            horizontalItemPadding: '10px',
        },
    },
}

export default theme
