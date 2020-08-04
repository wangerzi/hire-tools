<template>
    <div>
        <i-form v-model="condition" :label-width="80">
            <FormItem label="Job">
                <Select v-model="condition.job" style="width:200px" placeholder="Please select">
                    <Option v-for="item in general" :value="item.name" :key="item.name">{{ item.label }}</Option>
                </Select>
                <p v-if="currentJobInfo">{{currentJobInfo.desc}}</p>
            </FormItem>
        </i-form>
        <template v-if="questionList.length">
            <list-card ref="list-card" v-for="item of questionList" :key="item.label" :list="item.list" :label="item.label" @select-change="handleSelectChange"></list-card>
        </template>
        <i-form style="margin-top: 30px;" v-if="this.selectedNum">
            <FormItem label="Preview">
                <Input :value="copyContent" type="textarea" :autosize="true" readonly placeholder="Copy Content" />
                <p>{{this.selectedNum}} question{{this.selectedNum>1?'s':''}} selected!</p>
            </FormItem>
            <FormItem label="">
                <Button
                        icon="ios-copy"
                        type="primary"
                        v-clipboard:copy="copyContent"
                        v-clipboard:success="clipboardSuccessHandler"
                        v-clipboard:error="clipboardErrorHandler"
                >Copy Now</Button>
            </FormItem>
        </i-form>
    </div>
</template>

<script>
    import ListCard from "../components/question/ListCard";
    import { general } from "../api/question";
    import { getRequest } from "../api/request";

    export default {
        name: "Question",
        components: {
            ListCard
        },
        watch: {
            'condition.job': {
                deep: true,
                handler() {
                    this.handleJobChange();
                }
            }
        },
        computed: {
            copyContent() {
                let content = '';
                for (let i = 0; i < this.selectedItems.length; i++) {
                    const item = this.selectedItems[i];
                    content += ("Q"+(i+1) + '. ' + item['title'] + "\n");
                    if (item['answer']) {
                        content += ("A: "+item['answer']+"\n")
                    }
                    content += "\n";
                }
                return content;
            },
            currentJobInfo() {
                let jobInfo = null;
                if (this.condition.job) {
                    for (let i = 0; i < this.general.length; i++) {
                        if (this.general[i].name === this.condition.job) {
                            jobInfo = this.general[i];
                        }
                    }
                }
                return jobInfo;
            }
        },
        methods: {
            getSelectedItems() {
                let items = [];
                for (let i = 0; i < this.questionList.length; i++) {
                    items = [].concat(items, this.$refs['list-card'][i].getSelectedItems());
                }
                return items;
            },
            handleSelectChange() {
                this.selectedItems = this.getSelectedItems();
                this.selectedNum = this.selectedItems.length;
            },
            initSelectItems() {
                this.selectedNum = 0;
                this.selectedItems = [];
            },
            handleJobChange() {
                getRequest('/json/question/' + this.condition.job + '.json').then(r => {
                    this.questionList = r.data;
                    this.initSelectItems();
                }).catch(e => {
                    this.$Notice.error({
                        title: e,
                    })
                })
            },
            clipboardSuccessHandler () {
                this.$Notice.success({
                    title: 'Copy Success!'
                })
            },
            clipboardErrorHandler () {
                this.$Notice.error({
                    title: 'Copy failed.Please copy manually!'
                })
            }
        },
        data() {
            return {
                condition: {
                    job: '',
                },
                selectedNum: 0,
                questionList: [],
                general: [],
                selectedItems: [],
            }
        },
        mounted() {
            general().then(r => {
                this.general = r.data;
            }).catch(e => {
                this.$Notice.error({
                    title: e,
                })
            })
        }
    }
</script>

<style scoped>

</style>