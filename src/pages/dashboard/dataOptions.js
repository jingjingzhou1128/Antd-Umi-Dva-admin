export const colors = ['#1890ff', '#13c2c2', '#2fc25b', '#facc14', '#f04864', '#8543e0']

export const lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      width: 200,
      color: '#333'
    },
    padding: [5, 15],
    formatter: function (params) {
      return `<div class="tip">
          <span>${params[0].axisValue}</span>
          <span>${params[0].value}</span>
      </div>`
    },
    position: function (point, params, dom, rect, size) {
      return [point[0], '50%']
    },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  grid: {
    left: 0,
    right: 0,
    top: 10,
    bottom: 0
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [{
    data: [],
    type: 'line',
    symbol: 'circle',
    symbolSize: 4,
    smooth: true,
    itemStyle: {
      color: 'transparent'
    },
    lineStyle: {
      color: '#975fe4'
    },
    areaStyle: {
      color: '#975fe4',
      opacity: 1
    },
    emphasis: {
      itemStyle: {
        color: '#975fe4',
        borderType: 'solid',
        borderWidth: 2,
        borderColor: '#fff'
      }
    }
  }]
}

export const barOption = {
  color: ['#3aa0ff'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      width: 200,
      color: '#333'
    },
    padding: [5, 15],
    formatter: function (params) {
      return `<div class="tip primary">
        <span>${params[0].axisValue}</span>
        <span>${params[0].value}</span>
      </div>`
    },
    position: function (point, params, dom, rect, size) {
      return [point[0], '50%']
    },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  xAxis: {
    type: 'category',
    data: [],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [
    {
      type: 'bar',
      barWidth: 15,
      data: []
    }
  ]
}

export const saleTrendOption = {
  color: ['#3aa0ff'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      width: 200,
      color: '#333'
    },
    padding: [5, 15],
    formatter: function (params) {
      return `<div class="tip primary">
        <span>${params[0].axisValue}</span>
        <span>${params[0].value}</span>
      </div>`
    },
    // position: function (point, params, dom, rect, size) {
    //   return [point[0], '50%']
    // },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  grid: {
    left: 50,
    right: 10,
    bottom: 20,
    top: 10
  },
  xAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#bfbfbf'
      }
    },
    axisTick: {
      alignWithLabel: true,
      lineStyle: {
        color: '#bfbfbf'
      }
    },
    axisLabel: {
      color: '#545454'
    },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#545454'
    },
    axisTick: {
      show: false
    },
    splitLine: {
      color: '#bfbfbf',
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      type: 'bar',
      barMaxWidth: 25,
      data: []
    }
  ]
}

export const searchOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      width: 200,
      color: '#333'
    },
    padding: [5, 15],
    formatter: function (params) {
      return `<div class="tip">
          <span>${params[0].axisValue}</span>
          <span>${params[0].value}</span>
      </div>`
    },
    position: function (point, params, dom, rect, size) {
      return [point[0], '50%']
    },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  grid: {
    left: 0,
    right: 0,
    top: 10,
    bottom: 0
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    show: false
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [{
    data: [],
    type: 'line',
    symbol: 'circle',
    symbolSize: 4,
    smooth: true,
    itemStyle: {
      color: 'transparent'
    },
    lineStyle: {
      color: '#3aa0ff'
    },
    areaStyle: {
      color: '#3aa0ff',
      opacity: 0.3
    },
    emphasis: {
      itemStyle: {
        color: '#3aa0ff',
        borderType: 'solid',
        borderWidth: 2,
        borderColor: '#fff'
      }
    }
  }]
}

export const salePerOption = {
  title: {
    text: '销售额',
    textStyle: {
      color: '#aaa',
      fontWeight: 'normal',
      fontSize: 14
    },
    subtext: '',
    subtextStyle: {
      color: '#333',
      fontSize: 20,
      align: 'center'
    },
    itemGap: 20,
    top: '40%',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    renderMode: 'html',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textStyle: {
      fontSize: '12px',
      width: 200,
      color: '#333'
    },
    padding: [5, 15],
    // formatter: function (params) {
    //   return `<div class="tip">
    //       <span>${params.name}</span>
    //       <span>${params.percent}%</span>
    //   </div>`
    // },
    extraCssText: 'border-radius: 2;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
 },
  series: [
    {
      name: '销售额',
      type: 'pie',
      radius: ['70%', '90%'],
      legendHoverLink: false,
      hoverAnimation: false,
      selectedMode: 'multiple',
      selectedOffset: 5,
      label: {
        show: false
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
}
