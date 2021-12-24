export default {
    functional: true,
    props: {
        row: Object, // 表格的某一行数据
        render: Function, //render方法
        index: Number, //列下标
        item: {
            type: Object,
            default: null
        },
        data: Array, //表格里所有数据
        curRowIndex: { //行下标
            type: [Number, String]
        }
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index,
            data: ctx.props.data,
            curRowIndex: ctx.props.curRowIndex
        }
        if (ctx.props.item) params.item = ctx.props.item
        return ctx.props.render(h, params)
    }
}