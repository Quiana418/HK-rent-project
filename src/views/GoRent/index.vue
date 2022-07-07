<template>
  <div class="container">
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.back()" />
    <div class="rent-list">
      <div class="list-header">房源信息</div>
      <van-cell
        title="小区名称"
        is-link
        :value="housing ? housing.communityName : '请输入小区名称'"
        @click="$router.push('./rentsearch')"
      />
    </div>
    <van-field
      v-model.trim="dataObj.price"
      type="number"
      label="租 金"
      placeholder="请输入租金/月"
    >
    </van-field>
    <div class="price_month">￥/月</div>

    <van-field
      v-model.trim="dataObj.size"
      type="number"
      label="建筑面积"
      placeholder="请输入建筑面积"
    >
    </van-field>
    <div class="area">㎡</div>

    <!-- 点击请选择弹出弹出层 -->
    <div class="rent-list">
      <van-cell title="户 型" is-link :value="value" @click="showPicker = true">
      </van-cell>

      <van-popup v-model="showPicker" position="bottom" v-if="showPicker">
        <van-picker
          show-toolbar
          value-key="label"
          :columns="houseDetails.roomType"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>

    <!-- 点击请选择弹出弹出层 -->
    <div class="rent-list">
      <van-cell
        title="所在楼层"
        is-link
        :value="value1"
        @click="showPicker1 = true"
      />

      <van-popup v-model="showPicker1" position="bottom" v-if="showPicker1">
        <van-picker
          show-toolbar
          value-key="label"
          :columns="houseDetails.floor"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>
    </div>

    <!-- 点击请选择弹出弹出层 -->
    <div class="rent-list">
      <van-cell
        title="朝 向"
        is-link
        :value="value2"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom" v-if="showPicker2">
        <van-picker
          show-toolbar
          value-key="label"
          :columns="houseDetails.oriented"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>
    </div>

    <!-- 房屋标题 -->
    <div class="rent-list another_title">
      <div class="list-header">房屋标题</div>
      <input
        v-model.trim="dataObj.title"
        type="text"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
    </div>

    <!-- 房屋图像 -->
    <div class="rent-list another_title">
      <div class="list-header">房屋图像</div>
      <van-uploader
        :after-read="afterRead"
        class="img_box"
        multiple
        v-model="fileList"
      >
        <div class="add">+</div>
        <input class="box" />
      </van-uploader>
    </div>

    <!-- 房屋配置 -->
    <div class="rent-list another_title">
      <div class="list-header">房屋配置</div>
      <ul class="house_package">
        <li
          v-for="(item, index) in houseDetails.supporting"
          :key="index"
          @click="onClick(item.label)"
          :class="selected.includes(item.label) ? 'active' : ''"
        >
          <span><van-icon name="shop-o" size="large" /></span>
          {{ item.label }}
        </li>
      </ul>
    </div>

    <div class="bgc"></div>

    <!-- 房屋描述 -->
    <div class="rent-list another_title">
      <div class="list-header">房屋描述</div>
      <textarea
        type="text"
        placeholder="请输入房屋描述信息）"
        v-model.trim="dataObj.description"
      />
    </div>

    <div class="footer">
      <button class="cancel">取消</button>
      <button type="file" class="submit" @click="publishHouse">提交</button>
    </div>
  </div>
</template>

<script>
import { getHouseDetails, publishHouse, publishImg } from '@/api/search'
export default {
  name: 'GoRent',
  async created () {
    // 获取选中的 房屋数据
    try {
      const res = await getHouseDetails()
      console.log(res)
      this.houseDetails = res.data.body
      console.log(this.houseDetails)
    } catch (e) {
      console.log(e)
    }
  },
  data () {
    return {
      // 控制是否弹出户型弹出层
      showPicker: false,
      // 控制是否弹出所在楼层弹出层
      showPicker1: false,
      // 控制是否弹出朝向弹出层
      showPicker2: false,
      // 控制房屋配置图标是否变绿
      isActive: false,
      value: '请选择',
      value1: '请选择',
      value2: '请选择',
      // 选中的房屋配置 高亮
      selected: [],
      // 请求回来的房屋数据
      houseDetails: {},
      // 接收路由参数
      housing: this.$route.params.housing,
      fileList: [],
      // 发布房源需要传的参数
      dataObj: {
        title: '',
        description: '',
        oriented: '',
        supporting: '',
        price: '',
        roomType: '',
        size: '',
        floor: '',
        community: this.$route.params.housing?.community
      },
      houseImage: []
    }
  },
  methods: {
    onConfirm (value) {
      // console.log(value)
      this.value = value.label
      this.dataObj.roomType = value.value
      this.showPicker = false
    },
    onConfirm1 (value) {
      this.value1 = value.label
      this.dataObj.floor = value.value
      this.showPicker1 = false
    },
    onConfirm2 (value) {
      this.value2 = value.label
      this.dataObj.oriented = value.value
      this.showPicker2 = false
    },
    // 点击上传图片
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // this.publishImg(file.file)
      this.loadImage(file.file)
    },
    // 点击把房屋配置里的选中的内容存到数组里面 点击高亮
    onClick (val) {
      if (this.selected.includes(val)) {
        const index = this.selected.indexOf(val)
        this.selected.splice(index, 1)
      } else {
        this.selected.push(val)
      }
      this.dataObj.supporting = this.selected.join('|')
    },
    // 点击 发布房源
    async publishHouse () {
      try {
        const houseImg = this.houseImage.join('|')
        const res = await publishHouse({
          ...this.dataObj, houseImg

        })
        console.log(res)
        // const houseImageStr = this.houseImage.join('|')
        // console.log(houseImageStr)
        // this.houseImage = houseImageStr
      } catch (e) {
        console.log(e)
      }
    },
    // 加载图片
    async loadImage (file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await publishImg(formData)
        this.houseImage.push(res.data.body[0])
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.rent-list {
  width: 100%;
  // height: 305px;
  .list-header {
    box-sizing: border-box;
    width: 100%;
    line-height: 16px;
    height: 42px;
    color: #21b97a;
    background-color: #fff;
    font-size: 15px;
    padding: 15px 15px 9px;
    border-bottom: 1px solid #ddd;
  }
}
/deep/.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 0.26667rem 0.42667rem;
  overflow: hidden;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  height: 42px;
  background-color: #fff;
  border-bottom: 1px solid #ddd !important;
  span {
    color: #666 !important;
  }
}
.price_month {
  position: absolute;
  top: 3.8rem;
  left: 8.8rem;
  width: 34px;
  height: 14px;
  line-height: 14px;
  color: #888;
  font-size: 14px;
}
.area {
  position: absolute;
  top: 4.9rem;
  left: 9.2rem;
  width: 34px;
  height: 14px;
  line-height: 14px;
  color: #888;
  font-size: 14px;
}
.another_title {
  .list-header {
    position: relative;
    font-size: 14px;
    color: #333;
  }
  input {
    padding: 10px 15px 10px 15px;
    width: 345px;
    height: 23px;
    font-size: 14px;
    border: 0;
    background-color: transparent;
  }
  textarea {
    padding: 10px 15px 10px 15px;
    width: 345px;
    height: 123px;
    font-size: 14px;
    border: 0;
    background-color: transparent;
  }
  /deep/ .img_box,
  van-uploader__input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 375px;
    padding: 9px 0px 0;
    margin: 0 0px 15px;
    box-sizing: border-box;
    .box {
      margin-left: 10px;
      width: 82.75px;
      height: 82.75px;
      border: 1px solid #ddd;
      padding: 0;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
    .add {
      position: absolute;
      top: 3px;
      left: 30px;
      font-size: 68px;
      color: #ddd;
    }
  }
  .house_package {
    width: 375px;
    height: 142px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    background: #fff;
    li {
      text-align: center;
      width: 75px;
      height: 51px;
      margin: 10px 0;
      font-size: 14px;
      color: #333;
      /deep/span {
        display: block;
        width: 23px !important;
        height: 23px !important;
        margin: 3px 0 3px 25px;
      }
    }
    .active {
      color: #21b97a;
    }
  }
}
.bgc {
  width: 375px;
  height: 20px;
  background-color: #f6f5f6;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 375px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  .cancel {
    flex: 1;
    background-color: #fff;
    color: #21b97a;
    border: 0;
  }
  .submit {
    background-color: #21b97a;
    color: #fff;
    flex: 1;
    border: 0;
  }
}
</style>
