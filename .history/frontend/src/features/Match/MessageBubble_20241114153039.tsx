import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { Label } from '@/components/ui/label';
  import { Slider } from '@/components/ui/slider';
  import { Switch } from '@/components/ui/switch';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { Button } from '@/components/ui/button';
  
  interface FilterProps {
    onFilter: (filters: any) => void;
  }
  
  export default function MatchFilters({ onFilter }: FilterProps) {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="age">
          <AccordionTrigger>Age Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">18</span>
                  <span className="text-sm">50+</span>
                </div>
                <Slider
                  defaultValue={[20, 40]}
                  max={50}
                  min={18}
                  step={1}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
  
        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sf">San Francisco</SelectItem>
                <SelectItem value="nyc">New York City</SelectItem>
                <SelectItem value="la">Los Angeles</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
  
        <AccordionItem value="preferences">
          <AccordionTrigger>Preferences</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="nonsmoker">Non-smoker</Label>
                <Switch id="nonsmoker" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pets">Pet-friendly</Label>
                <Switch id="pets" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="quiet">Quiet hours</Label>
                <Switch id="quiet" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
  
        <div className="mt-6">
          <Button className="w-full" onClick={() => onFilter({})}>
            Apply Filters
          </Button>
        </div>
      </Accordion>
    );
  }