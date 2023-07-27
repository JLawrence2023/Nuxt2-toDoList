<template>
  <div
    class="new-task-container"
    :draggable="isDraggable"
    @dragstart="startDrag"
    @dragover.prevent
    @drop="drop"
  >
    <div class="task-title-container">
      <div class="task-title">{{ item.title }}</div>
    </div>
    <div class="new-tag-selected">
      <div class="new-tag-name" v-for="tagItem in item.tag" :key="tagItem">
        {{ tagItem }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "Nuxt-property-decorator";
import { Task } from "../../interfaces/task";

@Component
export default class AppCard extends Vue {
  @Prop({ type: Object, required: true }) item!: Task;
  @Prop({ type: Boolean, required: true }) isFiltering!: boolean;

  get isDraggable(): boolean {
    return !this.isFiltering;
  }

  startDrag(event: DragEvent): void {
    event.dataTransfer!.effectAllowed = "move";
    event.dataTransfer!.setData("text/plain", "");
    event.dataTransfer!.setData("itemID", this.item.id.toString());
  }

  drop(event: DragEvent): void {
    event.preventDefault();
    const sourceItemID = event.dataTransfer!.getData("itemID");
    if (sourceItemID !== this.item.id.toString()) {
      this.$emit("reorder-tasks", sourceItemID, this.item.id);
    }
  }
}
</script>

<style>
.new-task-container {
  width: 230px;
  height: 70px;
  border: 1px solid #c1c1c1;
  padding: 5px 9px 0 9px;
  border-radius: 2px;
  margin-bottom: 6px;
}
.task-title-container {
  width: 210px;
  height: 35px;
  margin: auto;
  margin-bottom: 7px;
}
.task-title {
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.new-tag-selected {
  display: flex;
}

.new-tag-name {
  text-align: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 35px;
  height: 15px;
  background: rgb(161, 175, 47);
  border-radius: 10px;
  margin-right: 4px;
}
</style>
