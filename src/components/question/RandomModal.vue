<template>
  <Modal
    v-model="current"
    title="Random Questions"
    :footer-hide="true">
    <Form label-position="top">
      <FormItem label="Problems min/max">
        <Slider v-model="range" range :step="1" show-stops :min="1" :max="10"></Slider>
      </FormItem>
      <FormItem label="Section min/max">
        <Slider v-model="sectionRange" range :step="1" show-stops :min="0" :max="10"></Slider>
      </FormItem>
      <FormItem label="Problem nums">
        <i-input :value="questionsNum" disabled></i-input>
      </FormItem>
      <FormItem label="" style="text-align: center;">
        <Button type="primary" icon="ios-refresh" @click="handleRandom">Refresh</Button>
      </FormItem>
    </Form>
    <copy-form :copy-items="selectedItems"></copy-form>
  </Modal>
</template>

<script>
  import CopyForm from "./CopyForm"
  import {getRandomListItems, getRandomNum} from "../../utils"

  export default {
    name: "RandomModal",
    components: {CopyForm},
    computed: {
      questionsNum() {
        return this.questionList.reduce((n, v) => {
          return n + v.list.length
        }, 0)
      }
    },
    props: {
      questionList: {
        type: Array,
        default: Array
      },
      initRule: {
        type: Object,
        default: () => {
          return {
            "min": 4,
            "max": 6,
            "min_section": 0,
            "max_section": 2
          }
        }
      }
    },
    watch: {
      initRule: {
        handler() {
          this.range = [this.initRule['min'], this.initRule['max']]
          this.sectionRange = [this.initRule['min_section'], this.initRule['max_section']]
        }
      }
    },
    data: function () {
      return {
        current: false,
        range: [this.initRule['min'], this.initRule['max']],
        sectionRange: [this.initRule['min_section'], this.initRule['max_section']],
        selectedItems: [],
      }
    },
    methods: {
      show() {
        this.current = true
        this.handleRandom()
      },
      handleRandom() {
        if (!this.checkRule()) {
          this.current = false
          return false
        }
        // start random questions
        const result = []
        // 1. calc total num from min and max (num will be changed if questions is not enough)
        const num = getRandomNum(this.range[0], this.range[1])
        // 2. get min_sec from every sec
        for (let i = 0; i < this.questionList.length; i++) {
          let item = this.questionList[i]
          result.push.apply(result, this.getRandomQuestionFromSectionList(item.list, this.sectionRange[0]))
        }
        // 2. calc need by num - min_sec * sec
        const need = num - result.length
        if (need > 0) {
          // 3. get max_sec - min_sec questions from not selected questions as total_list
          let totalList = []
          for (let i = 0; i < this.questionList.length; i++) {
            let item = this.questionList[i]
            totalList.push.apply(totalList, this.getRandomQuestionFromSectionList(item.list, this.sectionRange[1] - this.sectionRange[0], result))
          }
          totalList = getRandomListItems(totalList);
          // 4. if need < total_list, get need questions from total_list
          if (need < totalList.length) {
            result.push.apply(result, totalList.splice(0, need))
          } else {
            result.push.apply(result, totalList);
          }
        }
        // 5. merge all the questions, num = result.length;
        this.selectedItems = [].concat(result)
      },
      getListWithoutIgnore(list, ignore) {
        // use map to faster
        let ignoreMap = {};

        for (let i = 0; i < ignore.length; i++) {
          ignoreMap[JSON.stringify(ignore[i])] = 1;
        }

        let result = [];
        for (let i = 0; i < list.length; i++) {
          if (!ignoreMap[JSON.stringify(i)]) {
            result.push(list[i]);
          }
        }
        return result;
      },
      getRandomQuestionFromSectionList(list, need, ignore = []) {
        let randomList = list;
        if (ignore.length > 0) {
          randomList = this.getListWithoutIgnore(list, ignore)
        }
        return getRandomListItems(randomList, need)
      },
      checkRule() {
        // 1. check min and max params
        if (this.range[0] > this.range[1]) {
          this.$Message.error('questions min num > questions max num')
          return false
        }
        if (this.sectionRange[0] > this.sectionRange[1]) {
          this.$Message.error('section questions min num > section questions max num')
          return false
        }
        // 2. check questions num is valid
        if (this.questionsNum < this.range[0]) {
          this.$Message.error('questions is not enough')
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>

</style>
