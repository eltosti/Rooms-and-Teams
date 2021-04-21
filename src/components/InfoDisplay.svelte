<script>
  import {info, save} from "../store/store";
  import {saveChange} from "../store/actions";

  let GP = $save[$save["activeBuilding"]].separation.gold ?? 0
  let LB = $save[$save["activeBuilding"]].separation.labor ?? 0
  let GD = $save[$save["activeBuilding"]].separation.goods ?? 0
  let IF = $save[$save["activeBuilding"]].separation.influence ?? 0
  let MG = $save[$save["activeBuilding"]].separation.magic


  let limit
  $: limit = $info.totalAvailable < GP + LB + GD + IF + MG + $info.ECP
  let e
  $: e = earnings()

  function earnings() {
    let goods = (GD > 0) ? `+${GD} Goods` : ""
    let labor = (LB > 0) ? `+${LB} Labor` : ""
    let influence = (IF > 0) ? `+${IF} Influence` : ""
    let magic = (MG > 0) ? `+${MG} Magic` : ""
    let gp = (GP > 0) ? `+${GP} Gp` : ""
    let optionFinal = []
    let a =   [goods, labor, influence, magic, gp].map(a => {
      if (a !== "") optionFinal.push(a)
    })
    return optionFinal.join(", ")
  }

  const handleChange = () => {
    e = earnings()
    $save[$save["activeBuilding"]].separation.gold = GP
    $save[$save["activeBuilding"]].separation.labor = LB
    $save[$save["activeBuilding"]].separation.goods = GD
    $save[$save["activeBuilding"]].separation.influence = IF
    $save[$save["activeBuilding"]].separation.magic = MG
    $save = $save
    saveChange()
  }


</script>

<div class="pa-4">
    <div><b>Construction Cost:</b> {$info.creationCost}</div>
    <div><b>Earnings:</b> {e}</div>
    <div class:limit={limit}><b>Total Available:</b> {GP + LB + GD + IF + MG}/{$info.totalAvailable}</div>
    <div style="display: flex;justify-content: center">
        <table style="width: 100%">
            <tr>
                <th>Resource</th>
                <th>Distribution</th>
            </tr>
            <tr>
                <td><label for="info-GP">Gp:</label></td>
                <td><input on:change={handleChange} id="info-GP" bind:value={GP} type="number" min="0" max={$info.TEGP}>/{$info.EGP}
                </td>
            </tr>
            <tr>
                <td><label for="info-LB">Labor:</label></td>
                <td><input on:change={handleChange} id="info-LB" type="number" bind:value={LB} min="0" max={$info.TELB}>/{$info.ELB}
                </td>
            </tr>
            <tr>
                <td><label for="info-MG">Magic:</label></td>
                <td><input on:change={handleChange} id="info-MG" type="number" bind:value={MG} min="0" max={$info.TEMG}>/{$info.EMG}
                </td>
            </tr>
            <tr>
                <td><label for="info-IF">Influence:</label></td>
                <td><input on:change={handleChange} id="info-IF" type="number" min="0" bind:value={IF} max={$info.TEIF}>/{$info.EIF}
                </td>
            </tr>
            <tr>
                <td><label for="info-GD">Goods:</label></td>
                <td><input on:change={handleChange} id="info-GD" type="number" min="0" bind:value={GD} max={$info.TEGD}>/{$info.EGD}
                </td>
            </tr>
        </table>
    </div>
</div>

<style>
    table {
        border-collapse: collapse;
    }

    tr {
        vertical-align: baseline;
    }

    td {
        padding-left: 1rem;
    }

    input {
        width: 3rem;
        text-align: right;
    }

    .limit {
        color: red;
    }
</style>