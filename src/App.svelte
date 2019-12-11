<section>
  <div id=waveform></div>
  <div id=timeline></div>
  <div>
    <icon id=zoom-out/>
    <input type=range min=20 max=200 on:input={e => wavesurfer.zoom(+e.target.value)}>
    <icon id=zoom-in/>
  </div>
</section>

<AnnotationForm bind:regions/>
<Modal bind:show={modal_show} component={Files} props={{items, change_item}}/>

<button on:click={() => modal_show = true}>Add file</button>

<script>
import { onMount } from 'svelte';
import WaveSurfer from 'wavesurfer.js/src/wavesurfer';
import CursorPlugin from 'wavesurfer.js/src/plugin/cursor';
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline';
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions';
import AnnotationForm from './AnnotationForm.svelte';
import Files from './Files.svelte';
import { get, set } from 'idb-keyval';
import Modal from './Modal.svelte';

let regions = [];
let wavesurfer;
let items = {
    'https://ia800201.us.archive.org/18/items/72474274204_yahoo_002/001.mp3': {
        times: [],
        text: [],
    },
    'https://ia800201.us.archive.org/18/items/72474274204_yahoo_002/002.mp3': {
        times: [],
        text: [],
    },
};

onMount(async () => {
    items = await get('items') || items;
    wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#8BC34A',
        progressColor: '#7AAF3D',
        responsive: true,
        plugins: [
            CursorPlugin.create({
                showTime: true,
                opacity: 1,
                customShowTimeStyle: {
                    'background-color': '#000',
                    color: '#fff',
                    padding: '2px',
                    'font-size': '10px',
                },
            }),
            TimelinePlugin.create({container: '#timeline'}),
            RegionsPlugin.create({regions: []}),
        ],
    });
    wavesurfer.drawer.on('click', (e, progress) => {
        if (e.shiftKey)
            wavesurfer.addRegion({
                start: progress * wavesurfer.getDuration(),
                end: progress * wavesurfer.getDuration() + 0.05,
                color: 'rgba(0, 255, 0, 0.4)',
                data: {type: 'slice'},
                drag: true,
                resize: false,
            });
    });
    wavesurfer.on('ready', () => {
    });
    wavesurfer.on('error', e => {
        console.warn(e);
    });
});

let modal_show = false;
let modal_props = {};
let modal_component;
function show_modal(component, props) {
    modal_props = props || {};
    modal_component = component;
    modal_show = true;
}

function change_item(e) {
    const url = e.target.selectedOptions[0];
    // TODO: destroy
    wavesurfer.load(url);
}
document.addEventListener('keydown', e => {
    if (e.code === 'Space')
        wavesurfer[wavesurfer.isPlaying() ? 'pause' : 'play']();
});
</script>

<style>
#waveform {
  max-height: 10rem;
  position: relative
}
</style>
