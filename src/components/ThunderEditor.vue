<template>
    <Form ref="formDynamic" :model="formDynamic" :label-width="100" style="width: 50rem; margin: 0 auto;">
        <FormItem label="name">
            <Input type="text" v-model="formDynamic.name" placeholder="interviewee" />
        </FormItem>
        <FormItem label="template">
            <Select v-model="currentGroupIndex">
                <Option v-for="(item, index) in allGroups" :key="item.label" :value="index">{{item.label}}({{item.type}})</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Row :gutter="16">
                <i-col span="5">
                    title
                </i-col>
                <i-col span="5">
                    score
                </i-col>
                <i-col span="5">
                    total
                </i-col>
                <i-col span="5">
                    weight
                </i-col>
                <i-col span="3" offset="1">
                    operation
                </i-col>
            </Row>
        </FormItem>
        <span
                v-for="(item, index) in formDynamic.items"
                :key="index"
        >
            <FormItem
                    v-if="item.status"
                    :label="item.label">
                <Row :gutter="16">
                    <i-col span="5">
                        <Input type="text" v-model="item.title" placeholder="title" />
                    </i-col>
                    <i-col span="5">
                        <Input type="text" v-model="item.score" placeholder="score" />
                    </i-col>
                    <i-col span="5">
                        <Input type="text" v-model="item.total" placeholder="total" />
                    </i-col>
                    <i-col span="5">
                        <Input type="text" v-model="item.weight" placeholder="weight" />
                    </i-col>
                    <i-col span="3" offset="1">
                        <Button @click="handleRemove(index)">Delete</Button>
                    </i-col>
                </Row>
            </FormItem>
        </span>
        <FormItem>
            <Row>
                <i-col span="20">
                    <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                </i-col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
            <Button @click="handleReset()" style="margin-left: 8px">Reset</Button>
            <Button type="info" @click="handleSaveTemplate('formDynamic')" style="margin-left: 8px">Save As</Button>
        </FormItem>
    </Form>
</template>
<script>
    const DEFAULT_ITEMS_GROUP = [
        {
            label: 'backend',
            type: 'inner',
            status: 1,
            items: [
                {
                    title: '学习能力',
                    total: '30',
                    score: '0',
                    weight: '7',
                    status: 1
                },
                {
                    title: '方案产出',
                    total: '50',
                    score: '0',
                    weight: '9',
                    status: 1
                },
                {
                    title: '基本功',
                    total: '30',
                    score: '0',
                    weight: '7',
                    status: 1
                },
                {
                    title: '中间件使用',
                    total: '10',
                    score: '0',
                    weight: '7',
                    status: 1
                },
                {
                    title: '锦上添花',
                    total: '10',
                    score: '0',
                    weight: '6',
                    status: 1
                },
            ]
        }
    ];
    let LOCAL_ITEMS_GROUP = JSON.parse(localStorage.getItem('thunder-editor-customize-group'));
    LOCAL_ITEMS_GROUP = LOCAL_ITEMS_GROUP ? LOCAL_ITEMS_GROUP : [];
    export default {
        name: 'ThunderEditor',
        data() {
            return {
                formDynamic: {
                    name: '',
                    items: []
                },
                currentGroupIndex: 0,
                DEFAULT_ITEMS_GROUP,
                LOCAL_ITEMS_GROUP,
                editLabel: '',
            }
        },
        computed: {
            allGroups() {
                let data = [];
                if (this.LOCAL_ITEMS_GROUP) {
                    data = this.DEFAULT_ITEMS_GROUP.concat(this.LOCAL_ITEMS_GROUP)
                } else {
                    data = this.DEFAULT_ITEMS_GROUP;
                }

                return data.filter(v => v.status)
            },
            allGroupsMap() {
                let obj = {};
                for (const item of this.allGroups) {
                    obj[item.label] = item
                }
                return obj;
            },
        },
        watch: {
            currentGroupIndex: {
                immediate: true,
                handler() {
                    this.handleReset()
                }
            }
        },
        methods: {
            handleSubmit() {
                this.$Message.success('Success!');

                // format the code
                const submitData = {...this.formDynamic};
                submitData.items = submitData.items.filter(v => v.status)
                submitData.items = submitData.items.map(v => {
                    return {
                        title: v.title,
                        total: parseFloat(v.total),
                        score: parseFloat(v.score),
                        weight: parseFloat(v.weight),
                    }
                })
                this.$emit('submit', submitData);
            },
            handleSaveTemplate() {
                const submitData = {...this.formDynamic};
                submitData.items = submitData.items.filter(v => v.status)

                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.editLabel,
                                autofocus: true,
                                placeholder: 'Please enter label name...'
                            },
                            on: {
                                input: (val) => {
                                    this.editLabel = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        this.LOCAL_ITEMS_GROUP.push({
                            label: this.editLabel,
                            type: 'local',
                            status: 1,
                            items: submitData.items.map((v) => {
                                const val = {...v};
                                val.score = '0';
                                return val;
                            }),
                        });
                        localStorage.setItem('thunder-editor-customize-group', JSON.stringify(this.LOCAL_ITEMS_GROUP));
                        this.editLabel = '';
                    }
                })
            },
            handleReset() {
                // this.formDynamic.items = this.DEFAULT_ITEMS_GROUP[this.currentGroupIndex].items.slice(0)
                this.$set(this.formDynamic, 'items', this.allGroups[this.currentGroupIndex].items.map(v => {return {...v}}))
            },
            handleAdd() {
                this.formDynamic.items.push({
                    title: '',
                    total: '',
                    score: '',
                    weight: '',
                    status: 1
                });
            },
            handleRemove(index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>
