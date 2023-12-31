import { Component, inject} from '@angular/core';

import { NavService } from '../services/nav.service';
import { SpellsService } from '../services/spells.service';
import { InventoryService } from '../services/inventory.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  navigationVariable: string = "spells"
  isOpen: string = "true"
  toggle(): void {
    this.isOpen = this.navService.toggle()
  }
  exportToJson(event: Event): void {
    event.preventDefault()
    let state = {
      spells: this.spellsService.spells,
      yourSpells: this.spellsService.yourSpells, 
      spellDetailsCalled: this.spellsService.spellDetailsCalled,
      items: this.inventoryService.itemsSeparate,
      yourItems: this.inventoryService.yourItems,
      containers: this.inventoryService.containers,
      totalWeight: this.inventoryService.totalWeight,
      moneyPouch: this.inventoryService.moneyPouch
    };
    this.navService.exportToJson(state);
  }
  readFileOnUpload(event: Event): void {
    this.navService.readFileOnUpload(event)
  }
  newCharacter(): void {
    this.navService.newCharacter()
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(
      map(result => !result.matches),
      shareReplay()
    );
  
  constructor (private navService: NavService, private spellsService: SpellsService, private inventoryService: InventoryService) {}
}
