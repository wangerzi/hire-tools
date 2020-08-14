<template>
    <Modal
            v-model="current"
            title="随机出题"
            :footer-hide="true">
        <Form label-position="top">
            <FormItem label="Problems min/max">
                <Slider v-model="range" range :step="1" show-stops :min="1" :max="10"></Slider>
            </FormItem>
            <FormItem label="Section min/max">
                <Slider v-model="sectionRange" range :step="1" show-stops :min="1" :max="10"></Slider>
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
  import CopyForm from "./CopyForm";
  export default {
    name: "RandomModal",
    components: { CopyForm },
    computed: {
      questionsNum() {
        return this.questionList.reduce((n, v) => {
          return n+v.list.length;
        }, 0);
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
            "min_section": 1,
            "max_section": 2
          }
        }
      }
    },
    watch: {
      initRule: {
        handler() {
          this.rule = {...this.initRule}
        }
      }
    },
    data: function () {
      return {
        current: false,
        range: [this.initRule['min'], this.initRule['max']],
        sectionRange: [this.initRule['min_section'], this.initRule['max_section']],
        selectedItems: [],
      };
    },
    methods: {
      show() {
        this.current = true;
        this.handleRandom();
      },
      handleRandom() {
        if (!this.checkRule()) {
          this.current = false;
          return false;
        }
        // start random questions
        const result = [];
        // 1. every section has sectionRange['min_section'] questions
        this.selectedItems = [].concat(result);
      },
      checkRule() {
        // 1. check min and max params
        if (this.range[0] > this.range[1]) {
          this.$Message.error('questions min num > questions max num')
          return false;
        }
        if (this.sectionRange[0] > this.sectionRange[1]) {
          this.$Message.error('section questions min num > section questions max num')
          return false;
        }
        // 2. check questions num is valid
        if (this.questionsNum < this.range[0]) {
          this.$Message.error('questions is not enough');
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>

</style>