<template>
    <div>
        <template v-if="questionList.length">
            <list-card v-for="item of questionList" :key="item.label" :list="item.list" :label="item.label" @select-change="handleSelectChange"></list-card>
        </template>
        <template v-if="!questionList.length">
            暂无数据
        </template>
    </div>
</template>

<script>
    import ListCard from "../components/question/ListCard";
    export default {
        name: "Question",
        components: {
            ListCard
        },
        methods: {
            handleSelectChange() {
            }
        },
        data() {
            return {
                selectedNum: 0,
                questionList: [
                    {
                        'label': "Linux 实操",
                        'list': [
                            {
                                'title': "写一个周期性的计划任务，每4小时执行一次对 /etc 目录的备份，备份保存到 /data/backup 目录中，保存的文件名形如 etc-2020072108.tgz",
                                'reference': "这里是参考答案，可能换行\n换行\n换行"
                            },
                            {
                                'title': "写一个周期性的计划任务，每4小时执行一次对 /etc 目录的备份，备份保存到 /data/backup 目录中，保存的文件名形如 etc-2020072108.tgz",
                                'reference': "这里是参考答案，可能换行\n换行\n换行"
                            }
                        ]
                    },
                    {
                        'label': "网络协议理解",
                        'list': [
                            {
                                'title': "写一个周期性的计划任务，每4小时执行一次对 /etc 目录的备份，备份保存到 /data/backup 目录中，保存的文件名形如 etc-2020072108.tgz",
                                'reference': "这里是参考答案，可能换行\n换行\n换行"
                            },
                            {
                                'title': "写一个周期性的计划任务，每4小时执行一次对 /etc 目录的备份，备份保存到 /data/backup 目录中，保存的文件名形如 etc-2020072108.tgz",
                                'reference': "这里是参考答案，可能换行\n换行\n换行"
                            }
                        ]
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>