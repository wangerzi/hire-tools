<template>
    <div class="list-container">
        <h2>{{label}}</h2>
        <Table border ref="selection" :columns="columns" :data="list" @on-selection-change="handleSelectionChange"></Table>
    </div>
</template>

<script>
    export default {
        name: "ListCard",
        props: {
            list: {
                type: Array,
            },
            label: {
                type: String,
                default: "Question List"
            }
        },
        methods: {
            handleSelectionChange(selection) {
                this.selected = selection.reduce((prev, cur) => {
                    prev.push(cur._index);
                    return prev;
                }, []);
                this.$emit('select-change', this.selected.length);
            },
            getSelectedItems() {
                const result = [];
                for (let index of this.selected) {
                    result.push(this.question[index]);
                }
                return result;
            }
        },
        data() {
            const renderPreSpan = (field) => {
                const func = (h, params) => {
                    return h('span', {
                        style: "white-space: pre-wrap"
                    }, params.row[field]);
                }
                return func;
            };
            return {
                selected: [],
                question: [].concat(this.list).map((v, i) => {
                    v._index = i;
                    v.answer = '';
                    return v;
                }),
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Title',
                        key: 'title',
                        render: renderPreSpan('title')
                    },
                    {
                        title: 'Reference',
                        key: 'reference',
                        render: renderPreSpan('reference')
                    },
                    {
                        title: 'Answer',
                        key: 'answer',
                        render: (h, params) => {
                            return h('Input', {
                                props: {
                                    type: 'textarea'
                                },
                                style: "margin: 10px 0;",
                                on: {
                                    'on-blur': (event) => {
                                        this.question[params.index].answer = event.target.value;
                                        this.$emit('select-change', this.selected.length);
                                    }
                                }
                            }, params.row.answer);
                        }
                    }
                ],
            }
        }
    }
</script>

<style scoped>
    h2 {
        margin: 20px 0;
    }
</style>