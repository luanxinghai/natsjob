<template>
  <el-date-picker v-model="dtime" type="datetimerange" range-separator="至" start-placeholder="开始时间"
    end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" :default-time="defaultTime" @change="setStime"
    :shortcuts="shortcutsValue" style="width: 400px" unlink-panels />
</template>

<script setup>
import dayjs from "dayjs";
import { watch } from "vue";
const emit = defineEmits(["update:sdate", "update:edate"]);
const props = defineProps({
  sdate: {
    type: String,
    default: "",
  },
  edate: {
    type: String,
    default: "",
  },
  day: {
    type: Number,
    default: 0,
  },
  shortcuts: {
    type: Boolean,
    default: true,
  },
});

const dtime = ref([
  null,
  null,
]);
const defaultTime = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
];

onBeforeMount(() => {
  setDateTime()
});
watch(props, () => {

  setDateTime()
})

const setDateTime = () => {
  //console.log(',,,,,,,,', props)
  let sdate = props.sdate ?? "";
  //console.log(sdate, dayjs(sdate))
  if (!dtime.value) {
    dtime.value = [null, null]
  }

  dtime.value[0] = sdate;// (sdate != "" ? dayjs(sdate) : null);

  let edate = props.edate ?? "";
  dtime.value[1] = edate// (edate != "" ? dayjs(edate) : null);

  if (!props.shortcuts) {
    shortcutsValue = [];
  }
}



const setStime = () => {
  //console.log("000000,,,", dtime.value)
  if (dtime.value && dtime.value.length >= 2) {
    emit("update:sdate", dayjs(dtime.value[0]).format("YYYY-MM-DD HH:mm:ss"));
    emit("update:edate", dayjs(dtime.value[1]).format("YYYY-MM-DD HH:mm:ss"));
    return
  }
  emit("update:sdate", '');
  emit("update:edate", '');
};

let shortcutsValue = [
  {
    text: "今天",
    value: () => {
      return [dayjs().startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近2天",
    value: () => {
      return [dayjs().add(-1, 'day').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近3天",
    value: () => {
      return [dayjs().add(-2, 'day').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近5天",
    value: () => {
      return [dayjs().add(-4, 'day').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近一周",
    value: () => {
      return [dayjs().add(-6, 'day').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "本周",
    value: () => {
      const weekday = dayjs().day()
      const we = weekday === 0 ? 0 - 1 : 0
      const beginDate = dayjs().add(we, 'week').startOf('week').add(1, 'day')
      const endDate = dayjs().add(we, 'week').endOf('week').add(1, 'day')
      return [beginDate, endDate];
    },
  },
  {
    text: "本月",
    value: () => {
      return [dayjs().date(1).startOf("day"), dayjs().endOf("day")];
    },
  },

  {
    text: "近1个月",
    value: () => {
      return [dayjs().add(-1, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近2个月",
    value: () => {
      return [dayjs().add(-2, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近3个月",
    value: () => {
      return [dayjs().add(-3, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近4个月",
    value: () => {
      return [dayjs().add(-4, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近5个月",
    value: () => {
      return [dayjs().add(-5, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近半年",
    value: () => {
      return [dayjs().add(-6, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
  {
    text: "近1年",
    value: () => {
      return [dayjs().add(-12, 'month').startOf("day"), dayjs().endOf("day")];
    },
  },
];
</script>

<style lang="scss" scoped></style>
