<template>
	<textarea id="noticeEditor" v-model="content"></textarea>
</template>
<script>
	import tinymce from 'tinymce';
	export default {
		props: ['content'],
		watchs: {
	        content (val) {
	            // 当传入值变化时跟新富文本内容
	            tinymce.get('noticeEditor').setContent(val);
	        }
	    },
	    data () {
	    	return {
	    		editor: null,
	    	}
	    },
		mounted () {
	        tinymce.init({
	            selector: '#noticeEditor',
	            branding: false,
	            elementpath: false,
	            height: 600,
	            language: 'zh_CN.GB2312',
	            menubar: 'edit insert view format table tools',
	            theme: 'modern',
	            plugins: [
	                'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
	                'searchreplace visualblocks visualchars code fullscreen fullpage',
	                'insertdatetime media nonbreaking save table contextmenu directionality',
	                'emoticons paste textcolor colorpicker textpattern imagetools codesample'
	            ],
	            toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
	            autosave_interval: '20s',
	            image_advtab: true,
	            table_default_styles: {
	                width: '100%',
	                borderCollapse: 'collapse'
	            },
	            setup: (editor)=> {
	                editor.on('init', ()=>{
	                	this.editor = editor;
	                    editor.setContent(this.content);
	                    editor.on('input change undo redo execCommand KeyUp', ()=>{
						// let editBody = editor.getBody(); 
						// editor.selection.select(editBody); 
						// let text = editor.selection.getContent( { 'format' : 'text' } );
						//console.log(editor.getContent())
	                        this.$emit('input', editor.getContent());
	                    });
	                });
	            }
	        });
	    },
	}
</script>
