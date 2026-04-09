import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IconMapPin } from "@tabler/icons-react"

export default function Location({ serviceType, formData, setFormData }) {

  if (serviceType === "Branch Visit") return null;

  const isHome = serviceType === "Home Service";
  const isHotel = serviceType === "Hotel Service";

  const updateLocation = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }))
  }

  return (
    <div>
      <Card className="flex 2xl:grid 2xl:grid-cols-[10%_90%]">
        
        <CardContent className="w-full text-center">
          <CardTitle className="font-bold">Address</CardTitle>
        </CardContent>

        <CardContent className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5 lg:pr-15 2xl:grid-cols-4 2xl:gap-5 2xl:pr-15">
          
          <div className="col-span-2 lg:col-span-4 2xl:col-span-4">
            <Button
              className="border border-primary text-primary hover:text-primary bg-white dark:bg-transparent"
              variant="outline"
              disabled={isHotel}
            >
              <IconMapPin className="text-primary" />
              Locate Me
            </Button>
          </div>

          <div>
            <Label>Province</Label>
            <Input
              value={formData.location.province}
              onChange={(e) => updateLocation("province", e.target.value)}
              disabled={isHotel}
            />
          </div>

          <div>
            <Label>
              City / Municipality <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.location.city}
              onChange={(e) => updateLocation("city", e.target.value)}
              disabled={isHotel}
            />
          </div>

          <div>
            <Label>
              Barangay <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.location.barangay}
              onChange={(e) => updateLocation("barangay", e.target.value)}
              disabled={isHotel}
            />
          </div>

          <div>
            <Label>House Number</Label>
            <Input
              value={formData.location.houseNumber}
              onChange={(e) => updateLocation("houseNumber", e.target.value)}
              disabled={isHotel}
            />
          </div>

          <div>
            <Label>
              Zone <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.location.zone}
              onChange={(e) => updateLocation("zone", e.target.value)}
              disabled={isHotel}
            />
          </div>

          <div>
            <Label>Street</Label>
            <Input
              value={formData.location.street}
              onChange={(e) => updateLocation("street", e.target.value)}
              disabled={isHotel}
            />
          </div>

          <div>
            <Label>
              Hotel Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.location.hotelName}
              onChange={(e) => updateLocation("hotelName", e.target.value)}
              disabled={isHome}
            />
          </div>

          <div>
            <Label>
              Room Number <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.location.roomNumber}
              onChange={(e) => updateLocation("roomNumber", e.target.value)}
              disabled={isHome}
            />
          </div>

          <div className="col-span-2 2xl:col-span-1">
            <Label>Landmark</Label>
            <Textarea
              value={formData.location.landmark}
              onChange={(e) => updateLocation("landmark", e.target.value)}
            />
          </div>

          <div className="col-span-2 2xl:col-span-1">
            <Label>Note</Label>
            <Textarea
              value={formData.location.note}
              onChange={(e) => updateLocation("note", e.target.value)}
            />
          </div>

        </CardContent>
      </Card>
    </div>
  )
}