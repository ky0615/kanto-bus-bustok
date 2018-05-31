<template>
<div>
  <header class="navbar topNav">
    <div class="container">
      <div class="navbar-brand">
        <a href="./" class="navbar-item">
          <h1 class="title is-8">関東バスのPASMOバス特典チケットを計算するやつ</h1>
        </a>
      </div>
    </div>
  </header>
  <section class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-two-fifths">

          <div class="field">
            <div class="field-label is-small">
              <label class="label" for="oneWayRate">片道料金</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-small" type="number" min="0" max="9000" step="10" name="oneWayRate" id="oneWayRate" v-model="oneWayRate">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="field-label is-small">
              <label class="label" for="rideMonth">一ヶ月に乗る日数</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-small" type="number" min="0" max="100" step="1" name="rideMonth" id="rideMonth" v-model="rideMonth">
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="field-label is-small">
              <label class="label" for="selectCategoryType">定期使用者</label>
            </div>
            <div class="field-body">
              <div class="control">
                <div class="select is-small">
                  <select v-model="selectPassType" id="selectCategoryType">
                    <option v-for="pt in passType" :key="pt.index" :value="pt.index">{{pt.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="field-label is-small">
              <label class="label" for="passType">定期の種別</label>
            </div>
            <div class="field-body">
              <div class="control">
                <div class="select is-small">
                  <select v-model="selectCategoryType" id="passType">
                    <option v-for="pt in categoryType" :key="pt.index" :value="pt.index">{{pt.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="field-label is-small">
              <label class="label" for="selectPeriodType">定期の期間</label>
            </div>
            <div class="field-body">
              <div class="control">
                <div class="select is-small">
                  <select v-model="selectPeriodType" id="selectPeriodType">
                    <option v-for="pt in periodType" :key="pt.index" :value="pt.index">{{pt.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="column">
          <h2>計算結果</h2>
          <table class="table is-bordered">
            <tr>
              <th>バス特適応前</th>
              <td>{{sum}}円</td>
            </tr>
            <tr>
              <th>バス特割引額</th>
              <td>{{tok}}円</td>
            </tr>
            <tr>
              <th>バス特適応後</th>
              <td>{{tokApplySum}}円</td>
            </tr>
            <tr>
              <th>定期券代</th>
              <td>{{calcPass}}円</td>
            </tr>
            <tr>
              <th>バス得との差額</th>
              <td>
                <span v-if="tokApplySum-calcPass<0">△</span>
                {{Math.abs(tokApplySum-calcPass)}}円
              </td>
            </tr>
            <tr>
              <th>判定</th>
              <td>
                <span v-if="tokApplySum-calcPass<0">バス特使用の方がお得</span>
                <span v-else>定期使用の方がお得</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>注意</h2>
      <div class="box">
        <div class="content is-small">
          <p>・2018/05/31現在の情報です。最新の情報は関東バスのHPを参照してください。</p>
          <p>・<a href="https://www.kanto-bus.co.jp/regular/pasmo.html#pointSec">バス特典チケットの計算方法(関東バスHP)</a></p>
          <p>・<a href="https://www.kanto-bus.co.jp/regular/pass.html">定期券について(関東バスHP)</a></p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>

export default {
  components: {
  },

  asyncData () {
    return {
      oneWayRate: 220,
      rideMonth: 20,
      selectPassType: 0,
      selectPeriodType: 0,
      selectCategoryType: 0,

      pass: [
        // 通勤, 通学, 学童
        [ // IC全線定期券
          [9200, 7360, 3680], // 1ヶ月
          [26220, 20980, 10490] // 3ヶ月
        ],
        [ // IC区間定期券
          [8100, 6480, 3240], // 1ヶ月
          [23090, 18470, 9240] // 3ヶ月
        ]
      ],

      passType: [
        { index: 0, name: '通勤' },
        { index: 1, name: '通学' },
        { index: 2, name: '学童' }
      ],

      periodType: [
        { index: 0, name: '1ヶ月' },
        { index: 1, name: '3ヶ月' }
      ],

      categoryType: [
        { index: 0, name: 'IC全線定期券' },
        { index: 1, name: 'IC区間定期券' }
      ]
    }
  },

  computed: {
    sum () {
      return this.oneWayRate * 2 * this.rideMonth
    },

    tok () {
      let tokSum = 0
      for (let i = 0; i < this.sum; i += 1000) {
        const ii = i % 10000
        if (ii === 1000 || ii === 2000) {
          tokSum += 100
        } else if (ii === 3000 || ii === 4000) {
          tokSum += 160
        } else if (ii === 5000) {
          tokSum += 330
        } else if (ii === 6000) {
          tokSum += 170
        } else if (ii === 7000 || ii === 8000 || ii === 9000 || ii === 10000) {
          tokSum += 180
        }
      }
      return tokSum
    },

    tokApplySum () {
      return this.sum - this.tok
    },

    calcPass () {
      return this.pass[this.selectCategoryType][this.selectPeriodType][this.selectPassType]
    }
  }
}
</script>

<style>
#id {
  width: 100vw;
}
</style>
