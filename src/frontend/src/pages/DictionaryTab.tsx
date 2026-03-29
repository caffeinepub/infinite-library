import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { DictionaryWord } from "../types";

interface DictionaryTabProps {
  words: DictionaryWord[];
  onAddWord: (word: Omit<DictionaryWord, "id" | "addedAt">) => void;
  onDeleteWord: (id: string) => void;
}

export function DictionaryTab({
  words,
  onAddWord,
  onDeleteWord,
}: DictionaryTabProps) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    word: "",
    englishDefinition: "",
    hindiDefinition: "",
    note: "",
  });

  const filtered = words.filter(
    (w) =>
      w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.englishDefinition.toLowerCase().includes(search.toLowerCase()),
  );

  function handleSubmit() {
    if (!form.word.trim() || !form.englishDefinition.trim()) return;
    onAddWord({
      word: form.word.trim(),
      englishDefinition: form.englishDefinition.trim(),
      hindiDefinition: form.hindiDefinition.trim() || undefined,
      note: form.note.trim() || undefined,
    });
    toast.success(`"${form.word}" added to dictionary`);
    setForm({ word: "", englishDefinition: "", hindiDefinition: "", note: "" });
    setShowForm(false);
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2 px-4 py-3">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search words..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 bg-card border-border text-foreground placeholder:text-muted-foreground h-9 text-sm"
            data-ocid="dictionary.search_input"
          />
        </div>
        <Button
          size="sm"
          className="h-9 px-3 bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => setShowForm(true)}
          data-ocid="dictionary.add_word.button"
        >
          <Plus size={16} />
        </Button>
      </div>
      <p className="px-4 text-xs text-muted-foreground mb-3">
        {words.length} word{words.length !== 1 ? "s" : ""} in your dictionary
      </p>
      <ScrollArea className="flex-1">
        {filtered.length === 0 ? (
          <div className="py-16 text-center" data-ocid="dictionary.empty_state">
            <BookOpen
              size={36}
              className="text-muted-foreground/40 mx-auto mb-3"
            />
            <p className="text-muted-foreground text-sm">
              {search
                ? "No words found"
                : "Your dictionary is empty. Add words as you read!"}
            </p>
            {!search && (
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-primary/30 text-primary"
                onClick={() => setShowForm(true)}
              >
                <Plus size={14} className="mr-1" />
                Add First Word
              </Button>
            )}
          </div>
        ) : (
          <div className="px-4 flex flex-col gap-3">
            {filtered.map((word, i) => (
              <div
                key={word.id}
                className="bg-card rounded-xl border border-border p-4"
                data-ocid={`dictionary.word.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {word.word}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteWord(word.id);
                      toast.success(`"${word.word}" removed`);
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 flex-shrink-0"
                    data-ocid={`dictionary.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium text-primary mb-0.5">
                    English
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {word.englishDefinition}
                  </p>
                </div>
                {word.hindiDefinition && (
                  <div className="mt-2 p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-xs font-medium text-accent mb-0.5">
                      हिंदी
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {word.hindiDefinition}
                    </p>
                  </div>
                )}
                {word.note && (
                  <p className="text-xs text-muted-foreground italic mt-2">
                    📝 {word.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent
          className="bg-card border-border text-foreground max-w-sm mx-4"
          data-ocid="dictionary.add_word.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add New Word</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Word *</p>
              <Input
                placeholder="e.g., Ephemeral"
                value={form.word}
                onChange={(e) =>
                  setForm((p) => ({ ...p, word: e.target.value }))
                }
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                data-ocid="dictionary.word.input"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                English Definition *
              </p>
              <Textarea
                placeholder="Meaning in English..."
                value={form.englishDefinition}
                onChange={(e) =>
                  setForm((p) => ({ ...p, englishDefinition: e.target.value }))
                }
                className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-[80px] resize-none"
                data-ocid="dictionary.english_definition.textarea"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                हिंदी Definition (optional)
              </p>
              <Textarea
                placeholder="हिंदी में अर्थ..."
                value={form.hindiDefinition}
                onChange={(e) =>
                  setForm((p) => ({ ...p, hindiDefinition: e.target.value }))
                }
                className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-[70px] resize-none"
                data-ocid="dictionary.hindi_definition.textarea"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                Note (optional)
              </p>
              <Input
                placeholder="e.g., Often used in poetry..."
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                data-ocid="dictionary.note.input"
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!form.word.trim() || !form.englishDefinition.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-ocid="dictionary.add_word.submit_button"
            >
              <Plus size={14} className="mr-2" />
              Add Word
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
