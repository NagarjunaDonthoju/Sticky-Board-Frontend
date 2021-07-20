import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth/auth.guard";
import { BoardComponent } from "./board/board.component";
import { BoardsComponent } from "./boards.component";


const routes : Routes = [
    {
        path : '',
        component : BoardsComponent,
    },
    {
        path : ':boardID',
        component : BoardComponent,
        canActivate : [AuthGuard]
    }
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class BoardsRoutingModule {}