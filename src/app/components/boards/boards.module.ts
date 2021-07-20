import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { CustomPipesModule } from "src/app/pipes/custom-pipes/custom-pipes.module";
import { BoardComponent } from "./board/board.component";
import { CardComponent } from "./board/card/card.component";
import { BoardsRoutingModule } from "./boards-routing.module";
import { BoardsComponent } from "./boards.component";

@NgModule({
    declarations : [BoardsComponent, CardComponent, BoardComponent],
    imports : [
        CommonModule,
        BoardsRoutingModule,
        NgxSpinnerModule,
        AngularMaterialModule,
        FormsModule,
        CustomPipesModule
    ],
})

export class BoardsModule {}