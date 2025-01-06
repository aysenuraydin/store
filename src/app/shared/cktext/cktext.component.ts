import { Component, EventEmitter, Input, Output, ViewEncapsulation, type OnInit } from '@angular/core';
import { loadCKEditorCloud, type CKEditorCloudResult, type CKEditorCloudConfig, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import type { ClassicEditor, EditorConfig } from 'https://cdn.ckeditor.com/typings/ckeditor5.d.ts';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzYyOTQzOTksImp0aSI6IjVlMTEzZDM1LWU2MDYtNDBmZC1iYmE1LTAyOTdhODEwMjBlNCIsImxpY2Vuc2VkSG9zdHMiOlsiKi53ZWJjb250YWluZXIuaW8iLCIqLmpzaGVsbC5uZXQiLCIqLmNzcC5hcHAiLCJjZHBuLmlvIiwiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIiwic2giXSwibGljZW5zZVR5cGUiOiJldmFsdWF0aW9uIiwidmMiOiJiMDgyY2I1ZSJ9.zhHjCGIqUdPfwZil5J0fqDHdvQePXRzxLHkaZxu2LlubAxhoCeZeDWqbqIkkQffCH0VqXf528_e3g4d37kVs8A';

const cloudConfig = {
	version: '44.1.0'
} satisfies CKEditorCloudConfig;

  @Component({
    selector: 'cktext',
    templateUrl: './cktext.component.html',
    styleUrl: './cktext.component.css',
    encapsulation: ViewEncapsulation.None
  })
  export class CktextComponent implements OnInit {

  @Input() content: string = "";
  @Output() contentChange = new EventEmitter<string>();

  onContentChange( { editor }: ChangeEvent ) {
    this.content = editor.getData();
    this.contentChange.emit(this.content);
  }

	public Editor: typeof ClassicEditor | null = null;
	public config: EditorConfig | null = null;

	public ngOnInit(): void {
		loadCKEditorCloud(cloudConfig).then(this._setupEditor.bind(this));
	}

	private _setupEditor(cloud: CKEditorCloudResult<typeof cloudConfig>) {
		const {
			ClassicEditor, Alignment, AutoImage, Autosave, Bold, CloudServices, Code, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport, Highlight, ImageBlock, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, List, Paragraph, RemoveFormat, SimpleUploadAdapter, SpecialCharacters, Strikethrough, Subscript, Superscript, TodoList, Underline
		} = cloud.CKEditor;

		this.Editor = ClassicEditor;
		this.config = {
			toolbar: {
				items: [
					'fontSize',
					'fontFamily',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'underline',
					'strikethrough',
					'subscript',
					'superscript',
					'code',
					'removeFormat',
					'|',
					'specialCharacters',
					'link',
					'insertImage',
					'highlight',
					'|',
					'alignment',
					'|',
					'bulletedList',
					'numberedList',
					'todoList',
					'outdent',
					'indent'
				],
				shouldNotGroupWhenFull: false
			},
			plugins: [
				Alignment, AutoImage, Autosave, Bold, CloudServices, Code, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport, Highlight, ImageBlock, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, List, Paragraph, RemoveFormat, SimpleUploadAdapter, SpecialCharacters, Strikethrough, Subscript, Superscript, TodoList, Underline
			],
			fontFamily: {
				supportAllValues: true
			},
			fontSize: {
				options: [10, 12, 14, 'default', 18, 20, 22],
				supportAllValues: true
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			},
			image: {
				toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
			},
      initialData: this.content,
			licenseKey: LICENSE_KEY,
			link: {
				addTargetToExternalLinks: true,
				defaultProtocol: 'https://',
				decorators: {
					toggleDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'file'
						}
					}
				}
			},
			placeholder: ''
		};
	}
}

