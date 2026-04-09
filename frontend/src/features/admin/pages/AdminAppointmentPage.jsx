import { SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSideBar } from "../components/AdminSideBar"
import { ChartAreaInteractive } from "../components/ChartAreaInteractive"
import { DataTable } from "@/features/admin/components/appointment/DataTable"
import { SectionCards } from "../components/SectionCards"
import { SiteHeader } from "../components/SiteHeader"
import { IconPlus } from "@tabler/icons-react"

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import data from "../testdata/data.json"

const styleObject = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 12)",
}

function AdminAppointmentPage() {
    return (
        <SidebarProvider style={styleObject}>
					<AdminSideBar variant="inset" />
					<SidebarInset>
							<SiteHeader />
							<Card className="ml-4 mr-4 mt-4 p-2 ">
                    <CardHeader>
                        <span className="text-base font-semibold">Staffs</span>
                        <FieldDescription>
                            Manage your massage therapy Team.
                        </FieldDescription>
                    </CardHeader>
                    <Field orientation="horizontal" className="sm:max-w-lg">
                    <Input type="search" placeholder="Search by staff name, branch or role..." />
                    <Button>Search</Button>
                    <Button type="submit" form="form-rhf-demo">
                        <IconPlus />Add Appointment
                    </Button>
                    </Field>
                </Card>
							<div className="flex flex-1 flex-col">
								<div className="@container/main flex flex-1 flex-col gap-2">
										<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
									
											<DataTable data={data} />
										</div>
								</div>
							</div>
					</SidebarInset>
        </SidebarProvider>
    );
}

export default AdminAppointmentPage