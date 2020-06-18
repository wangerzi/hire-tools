<template>
    <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 50rem; margin: 0 auto;">
        <FormItem label="姓名">
            <Input type="text" v-model="formDynamic.name" placeholder="name" />
        </FormItem>
        <FormItem label="权值模板">
            <Select v-model="currentGroupIndex">
                <Option v-for="(item, index) in DEFAULT_ITEMS_GROUP" :key="item.label" :value="index">{{item.label}}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Row :gutter="16">
                <i-col span="5">
                    标题
                </i-col>
                <i-col span="5">
                    分数
                </i-col>
                <i-col span="5">
                    总分
                </i-col>
                <i-col span="5">
                    权重
                </i-col>
                <i-col span="3" offset="1">
                    操作
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
        </FormItem>
    </Form>
</template>
<script>
    const DEFAULT_ITEMS_GROUP = [
        {
            label: '后端',
            items: [
                {
                    title: '学习能力',
                    total: '40',
                    score: '0',
                    weight: '7',
                    status: 1
                },
                {
                    title: '方案产出能力',
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
                    title: '锦上添花的能力',
                    total: '10',
                    score: '0',
                    weight: '6',
                    status: 1
                },
            ]
        }
    ];
    export default {
        name: 'ThunderEditor',
        data() {
            return {
                formDynamic: {
                    name: '面试人',
                    items: []
                },
                currentGroupIndex: 0,
                DEFAULT_ITEMS_GROUP,
            }
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
            handleReset() {
                // this.formDynamic.items = this.DEFAULT_ITEMS_GROUP[this.currentGroupIndex].items.slice(0)
                this.$set(this.formDynamic, 'items', this.DEFAULT_ITEMS_GROUP[this.currentGroupIndex].items.map(v => {return {...v}}))
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
