import { Component, EventEmitter, OnInit, Output, ViewChild, AfterContentInit, AfterViewInit, ApplicationRef, ViewRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { PDFDocumentProxy, PdfViewerComponent } from 'ng2-pdf-viewer';
import { ElectronService } from '../../core/services';
import { TabInfo, TabsManagerService } from '../services/tabs-manager/tabs-manager.service';
import { filter, map } from 'rxjs/operators';
import { EventManager } from '@angular/platform-browser';
import { TranslationService } from '../../translation/services/translation.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Output('select') selectEvent = new EventEmitter();

  @ViewChild(PdfViewerComponent)
  private pdfComponent: PdfViewerComponent;

  loaded = false;

  docname = 'no';
  time = new Date();

  session: TabInfo;
  pdfSrc: string;

  pageCount = 0;
  page = 1; // PageNo
  get pageNo(): number {
    return this.page;
  }
  set pageNo(v: number) {
    this.page = v;
  }
  rotation = 0;
  zoom = 1;
  zoomScale: 'page-width' | 'page-fit' | 'page-height' = 'page-width'; // computed when [original-size]="false"
  originalSize = false;
  fitToPage = false;  // Works in combination with [original-size]="true"
  autoresize = true; // make sure that [original-size]="false"

  documentProxy: PDFDocumentProxy;


  constructor(
    private electron: ElectronService,
    private route: ActivatedRoute,
    private tabs: TabsManagerService,
    private router: Router,
    private app: ApplicationRef,
    private translation: TranslationService
  ) {
    // this.router.events.pipe(
    //   filter(e => e instanceof NavigationEnd),
    //   map(() => this.route)
    // ).subscribe((e: ActivatedRoute) => {
    //   console.log(e);
    // });
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.session = this.tabs.getTab(params['session']);
      if (this.session === undefined) {
        this.router.navigate(['/page-not-found']);
        return;
      }
      this.docname = this.session.title;
      this.time = new Date();
      this.pdfSrc = this.loadFile(this.session.ref);
    });
  }

  loadFile(filepath: string): string {
    console.log(`load ${filepath}`);
    const buffer = this.electron.fs.readFileSync(filepath);
    const blob = new File([new Uint8Array(buffer)], this.electron.path.basename(filepath));
    return URL.createObjectURL(blob);
  }

  loadCompleted(e: PDFDocumentProxy): void {
    console.log('loadCompleted');
    this.pageCount = e.numPages;
    this.loaded = true;
    this.documentProxy = e;
  }

  selectedText(): void {
    let s = '';
    try {
      // console.log(getSelection());
      const selection = getSelection();
      if (!selection.isCollapsed) {
        const fromNode = selection.anchorNode.parentElement;
        const finalNode = selection.focusNode.parentElement;
        const strArr: string[] = [];
        strArr.push(fromNode.textContent.slice(selection.anchorOffset));
        let n = fromNode.nextSibling;
        while (n !== finalNode) {
          strArr.push(n.textContent);
          n = n.nextSibling;
        }
        strArr.push(n.textContent.slice(0, selection.focusOffset));
        s = strArr.join(' ');
      }
      if (s.length > 0 && s.length < 2000) {
        this.translation.translate(
          s.replace(/\[\d+(\S\d+)*\]/g, '')
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  pageTo(e: string): void {
    let n = Number(e);
    console.log(n);
    if (!Number.isNaN(n)) {
      if (n < 1) {
        n = 1;
      } else if (n > this.pageCount) {
        n = this.pageCount;
      }
      this.page = n;
    }
    // if (e.code === 'Enter') {
    //   const no = (e.target as HTMLInputElement).valueAsNumber;
    //   // no = Number(no);
    //   if (!Number.isNaN(no)) this.page = no;
    // }
  }

  pagePrev(): void {
    const willPageNo = this.page - 1;
    if (willPageNo > 0) {
      this.page = willPageNo;
    }
  }

  pageNext(): void {
    const willPageNo = this.page + 1;
    if (willPageNo <= this.pageCount) {
      this.page = willPageNo;
    }
  }

  rotate(): void {
    let current_rotation = this.rotation;
    current_rotation += 90;
    if (current_rotation > 270) {
      current_rotation = 0;
    }
    this.rotation = current_rotation;
  }

  zoomScaleChange(): void {
    switch (this.zoomScale) {
      case 'page-width':
        this.zoomScale = 'page-height';
        break;
      case 'page-height':
        this.zoomScale = 'page-fit';
        break;
      case 'page-fit':
        this.zoomScale = 'page-width';
        break;
      default:
        break;
    }
  }

  onPageChange(e: number): void {
    console.log(e);
    if (this.page !== e) {
      this.page = e;
    }
  }

  onPageRendered(): void {
    // console.log('pageRendered');
  }

  onPageInitialized(): void {
    // console.log('pageInitialized');
  }

  onTextLayerRendered(): void {
    // console.log('textLayerRendered');
  }

}
