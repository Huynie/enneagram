<template>
  <div>
    <canvas id="myChart" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart  from 'chart.js/auto';

export default {
  name: "RadarChart",
  components: {
      
  },
  // props: {
  //   results:{
  //     type: Array,
  //     required: true
  //   }
  // },
  data() {
    return {
      labels: [
        '1 Reformer',
        '2 Helper',
        '3 Achiever',
        '4 Individualist',
        '5 Investigator',
        '6 Loyalist',
        '7 Enthusiast',
        '8 Challenger',
        '9 Peacemaker'
      ],
      datasets: []
    }
  },
  updated() {
    // Sets 3 most recent results
    this.$store.state.results.slice(0,3).forEach((result, idx) => {
      const set = {
        label: result["date/time"].toDate().toDateString(),
        data: result.score,
        fill: true,
        backgroundColor: idx === 0 ? '#F472B61A' : idx === 1 ? '#93C5FD1A' : '#5CDCBD1A',
        borderColor: idx === 0 ? '#F472B6' : idx === 1 ? '#93C5FD' : '#5CDCBD',
        pointBackgroundColor: idx === 0 ? '#F472B6' : idx === 1 ? '#93C5FD' : '#5CDCBD',
        pointBorderColor: idx === 0 ? '#F472B61A' : idx === 1 ? '#93C5FD1A' : '#5CDCBD1A',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }

      this.datasets.push(set);
    })

    const context = document.getElementById('myChart').getContext('2d');
    new Chart(context, {
      type: 'radar',
      data: this,
      options: {
        elements: {
          line: {
            borderWidth: 2
          }
        }
      },
    })
  },
  // mounted() {
  // }
}
</script>

<style>

</style>