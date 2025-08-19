<section>
    <h1>Http for file streaming</h1>
    <hr>
    <p>For videos it requires ffmpeg conversion to be able to be readen by browsers:</p>
    <!-- <code>ffmpeg -i video.mp4 -movflags frag_keyframe+empty_moov+default_base_moof -f mp4 output_frag.mp4</code> -->
    <code>ffmpeg -i video.mp4 -movflags frag_keyframe+empty_moov+default_base_moof+faststart -c copy -f mp4 output_frag.mp4</code> Web socket+ Media source (fragmented) 
    <code>ffmpeg -i video.mp4 -movflags +faststart -c copy output.mp4</code> Normal video in http for basic servicing (progressive)
    <code>ffmpeg -i video.mp4 -profile:v baseline -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ./hls/playlist.m3u8</code> HLS Video non compatible with H.264 + AAC audio
    <code>ffmpeg -i video.mp4 -c:v copy -c:a copy -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ./hls/playlist.m3u8</code> HLS Video compatible with H.264 + AAC like mp4
</section>