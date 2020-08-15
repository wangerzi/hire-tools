<template>
    <div>
        <i-form v-model="condition" :label-width="80">
            <FormItem label="Job">
                <Select v-model="condition.job" style="width:200px" placeholder="Please select">
                    <Option v-for="item in general" :value="item.name" :key="item.name">{{ item.label }}</Option>
                </Select>
                <Button
                        v-if="currentJobInfo"
                        icon="ios-repeat"
                        type="primary"
                        style="margin-left: 20px"
                        @click="handleRandomButton"
                >Random</Button>
            </FormItem>
            <FormItem label="Description" v-if="currentJobInfo">
                <p>{{currentJobInfo.desc}}</p>
                <random-modal ref="random-modal" :init-rule="currentJobInfo.random" :question-list="questionList"></random-modal>
            </FormItem>
        </i-form>
        <template v-if="questionList.length">
            <list-card ref="list-card" v-for="item of questionList" :key="item.label" :list="item.list"
                       :label="item.label" @select-change="handleSelectChange"></list-card>
        </template>
        <copy-form v-if="selectedNum" :copy-items="selectedItems"></copy-form>
    </div>
</template>

<script>
  import ListCard from "../components/question/ListCard";
  import CopyForm from "../components/question/CopyForm";
  import RandomModal from "../components/question/RandomModal";
  import {general} from "../api/question";
  import {getRequest} from "../api/request";

  export default {
    name: "Question",
    components: {
      ListCard,
      CopyForm,
      RandomModal
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
      handleRandomButton() {
        this.$refs['random-modal'].show();
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
