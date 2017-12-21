import {Component, Inject, Input, OnChanges, SimpleChanges, ElementRef, Renderer2} from '@angular/core';
import {TemplateService} from '../service/template.service';
import {IBusyConfig} from 'ng-busy';

@Component({
    moduleId: module.id,
    selector: 'demo-code',
    templateUrl: './code.component.html',
    providers: [{ provide: 'Window',  useValue: window }]
})
export class CodeComponent implements OnChanges {

    @Input() key: string;
    public code: string;
    private currentContent: any;
    @Input() private options: IBusyConfig;
    public optionsForShow: string;

    constructor(@Inject('Window') private window: any,
                private templateService: TemplateService,
                private render: Renderer2,
                private elementRef: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['key']) {
            if (this.currentContent) {
                this.render.removeChild(this.elementRef.nativeElement, this.currentContent);
                this.currentContent = undefined;
            }
            this.code = this.templateService.getCode(changes['key']['currentValue']);
            if (this.code) {
                this.currentContent = this.render.createElement('pre');
                this.render.setAttribute(this.currentContent, 'class', 'prettyprint');
                const currentText = this.render.createText(this.code);
                this.render.appendChild(this.currentContent, currentText);
                this.render.appendChild(this.elementRef.nativeElement, this.currentContent);
            }
            if (this.window.PR) {
                this.window.PR.prettyPrint();
            }
        }
        this.optionsForShow = this.stringifyOptions(this.options);
    }

    private stringifyOptions(config: IBusyConfig) {
        const options = {};
        let template;
        if (this.key === 'custom') {
            template = 'CustomBusyComponent';
        } else if (this.key === 'template') {
            template = 'customTemplate';
        } else {
            template = 'DefaultBusyComponent';
        }
        options['delay'] = config.delay;
        options['minDuration'] = config.minDuration;
        options['backdrop'] = config.backdrop;
        options['message'] = config.message;
        options['wrapperClass'] = config.wrapperClass;
        let result = JSON.stringify(options);
        result = result.replace('{', `{template:${template},`);
        return result;
    }
}
